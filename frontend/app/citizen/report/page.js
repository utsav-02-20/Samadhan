"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  CheckCircle2,
  FileText,
  Loader2,
  MapPin,
  Send,
  X,
  Shield,
  UserX,
  EyeOff,
  Navigation,
  Compass,
} from "lucide-react";

import { useUser, useAuth, UserButton } from "@clerk/nextjs";
import Logo from "@/components/ui/Logo";
import { submitComplaint } from "@/services/citizen.service";

const categories = [
  "Roads",
  "Street Lights",
  "Sanitation",
  "Water Supply",
  "Electricity",
  "Drainage",
  "Healthcare",
  "Other",
];

export default function ReportIssuePage() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [district, setDistrict] = useState("General");
  const [location, setLocation] = useState("");
  const [coords, setCoords] = useState({ latitude: "", longitude: "" });

  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");

  const [isAnonymous, setIsAnonymous] = useState(false);
  const [fetchingLocation, setFetchingLocation] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reportId, setReportId] = useState("");

  // Automatically attempt to fetch present location on page load
  useEffect(() => {
    getLocation(true);
  }, []);

  function handlePhotoChange(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image.");
      return;
    }

    setPhoto(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }

  function removePhoto() {
    setPhoto(null);
    setPhotoPreview("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function getLocation(silent = false) {
    if (!navigator.geolocation) {
      if (!silent) alert("Location is not supported by this browser.");
      return;
    }

    setFetchingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const latStr = latitude.toFixed(6);
        const lngStr = longitude.toFixed(6);

        setCoords({
          latitude: latitude.toString(),
          longitude: longitude.toString(),
        });

        try {
          // Free reverse geocoding via OpenStreetMap Nominatim
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          if (data && data.address) {
            const addr = data.address;
            const placeParts = [
              addr.road || addr.pedestrian || addr.suburb || addr.neighbourhood,
              addr.city || addr.town || addr.village || addr.county || addr.state_district,
              addr.state,
            ].filter(Boolean);

            const readableAddress = placeParts.length > 0 ? placeParts.join(", ") : data.display_name;
            setLocation(readableAddress);

            // Auto detect district if available
            if (addr.state_district || addr.county || addr.city) {
              setDistrict(addr.state_district || addr.county || addr.city || "General");
            }
          } else {
            setLocation(`${latStr}, ${lngStr}`);
          }
        } catch (err) {
          console.warn("Reverse geocoding failed, falling back to coordinates:", err);
          setLocation(`${latStr}, ${lngStr}`);
        } finally {
          setFetchingLocation(false);
        }
      },
      (error) => {
        setFetchingLocation(false);
        if (!silent) {
          alert("Please allow location access to fetch your current location.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!photo) {
      alert("Please take a photo of the issue.");
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("district", district);
      formData.append("locality", location || "General Locality");
      formData.append("latitude", coords.latitude || "0");
      formData.append("longitude", coords.longitude || "0");
      formData.append("images", photo);
      formData.append("isAnonymous", isAnonymous ? "true" : "false");

      const token = await getToken();
      const citizenId = isAnonymous ? `anon_${Date.now()}` : (user?.id || "default-citizen");

      const resData = await submitComplaint(citizenId, formData, token || undefined).catch(() => null);

      const id = resData?.data?.complaintId || resData?.data?._id || ("SAM-" + Math.floor(1000 + Math.random() * 9000));

      const newRecord = {
        _id: id,
        id: id,
        title: title,
        description: description,
        category: category,
        district: district,
        locality: location || "General Locality",
        location: { latitude: coords.latitude || "0", longitude: coords.longitude || "0" },
        images: photoPreview ? [photoPreview] : [],
        isAnonymous: isAnonymous,
        submittedBy: isAnonymous ? "Anonymous Citizen" : (user?.fullName || user?.firstName || "Citizen User"),
        status: "SUBMITTED",
        targetDepartment: "Unassigned",
        department: "Unassigned",
        priority: "HIGH",
        createdAt: new Date().toISOString(),
        date: new Date().toLocaleDateString("en-IN"),
        upvotes: 0,
      };

      try {
        const existingLocal = JSON.parse(localStorage.getItem("samadhan_submitted_problems") || "[]");
        const filtered = existingLocal.filter((item) => String(item.id || item._id) !== String(id));
        localStorage.setItem("samadhan_submitted_problems", JSON.stringify([newRecord, ...filtered]));
      } catch (e) {
        console.warn("Could not save to localStorage:", e);
      }

      setReportId(id);
      setSubmitted(true);
    } catch (err) {
      alert(err?.message || "Report could not be submitted. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
        <div className="w-full max-w-lg text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
            <CheckCircle2 className="h-10 w-10 text-emerald-500" />
          </div>

          <p className="mt-6 text-xs font-bold uppercase tracking-widest text-emerald-600">
            Report Submitted
          </p>

          <h1 className="mt-2 text-3xl font-black text-slate-900">
            Thank you for speaking up.
          </h1>

          <p className="mt-4 text-sm leading-6 text-slate-500">
            Your civic issue has been recorded successfully.
            {isAnonymous ? " Your identity is protected under Anonymous Mode." : " You can track its progress from your dashboard."}
          </p>

          <div className="mt-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Report ID
            </p>

            <p className="mt-2 text-2xl font-black text-slate-900">
              {reportId}
            </p>

            <p className="mt-3 text-sm text-slate-500">
              {title}
            </p>

            <div className="mt-5 flex items-center justify-between rounded-xl bg-amber-50 px-4 py-3 text-xs font-bold text-amber-700">
              <span>● Submitted • Awaiting review</span>
              {isAnonymous && (
                <span className="flex items-center gap-1 text-slate-600 bg-white/80 px-2 py-0.5 rounded-md border border-amber-200">
                  <UserX className="h-3 w-3" /> Anonymous
                </span>
              )}
            </div>

          </div>

          <div className="mt-6 flex gap-3">

            <Link
              href="/citizen/dashboard"
              className="flex-1 rounded-xl bg-slate-950 py-3 text-sm font-bold text-white hover:bg-slate-800"
            >
              Dashboard
            </Link>

            <Link
              href="/citizen/report"
              className="flex-1 rounded-xl border border-slate-200 bg-white py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
            >
              Report another
            </Link>

          </div>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* Header */}

      <header className="border-b border-slate-200 bg-white">

        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">

          <Link
            href="/citizen/dashboard"
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>

          <Logo href="/" size="sm" />

          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-9 w-9 border-2 border-indigo-200 shadow-sm",
              },
            }}
          />

        </div>

      </header>

      {/* Main */}

      <div className="mx-auto max-w-3xl px-6 py-10">

        <div>

          <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
            Citizen Portal
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight">
            Report a civic issue
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Report a problem in your area and help the responsible
            authorities take action.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >

          {/* Issue Details */}

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FileText className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-bold">
                  Issue details
                </h2>

                <p className="text-xs text-slate-500">
                  Describe the problem clearly.
                </p>
              </div>

            </div>

            <div className="mt-6 space-y-5">

              {/* Title */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Issue title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Example: Broken street light"
                  required
                  className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

              </div>

              {/* Category */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                >

                  <option value="">
                    Select category
                  </option>

                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}

                </select>

              </div>

              {/* Description */}

              <div>

                <label className="mb-2 block text-sm font-semibold">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the issue..."
                  rows={5}
                  maxLength={1000}
                  required
                  className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />

                <p className="mt-1 text-right text-xs text-slate-400">
                  {description.length}/1000
                </p>

              </div>

            </div>

          </section>

          {/* Location */}

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <MapPin className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-bold">
                  Location
                </h2>

                <p className="text-xs text-slate-500">
                  Tell us where the issue is located.
                </p>
              </div>

            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">

              <div className="relative flex-1">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={fetchingLocation ? "Detecting present location..." : "Enter location"}
                  required
                  className="h-12 w-full rounded-xl border border-slate-200 pl-4 pr-10 text-sm outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                />

                {location && (
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      coords.latitude && coords.longitude
                        ? `${coords.latitude},${coords.longitude}`
                        : location
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open location in Google Maps"
                    className="absolute right-3 top-3.5 text-slate-400 hover:text-emerald-600 transition"
                  >
                    <MapPin className="h-5 w-5 text-emerald-600" />
                  </a>
                )}
              </div>

              <button
                type="button"
                onClick={() => getLocation(false)}
                disabled={fetchingLocation}
                className="flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60 shrink-0"
              >
                {fetchingLocation ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
                    Fetching...
                  </>
                ) : (
                  <>
                    <Navigation className="h-4 w-4 text-emerald-600" />
                    Use my location
                  </>
                )}
              </button>

            </div>

            {/* Present location detection indicator & Google Maps redirect */}
            {coords.latitude ? (
              <a
                href={`https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-between gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3.5 py-2.5 rounded-xl border border-emerald-200/80 transition hover:bg-emerald-100/80 hover:shadow-sm cursor-pointer group"
              >
                <div className="flex items-center gap-2 min-w-0 truncate">
                  <Compass className="h-4 w-4 shrink-0 text-emerald-600 group-hover:rotate-45 transition duration-300" />
                  <span className="truncate">Live Location: GPS ({coords.latitude.slice(0, 7)}, {coords.longitude.slice(0, 7)})</span>
                </div>
                <span className="flex items-center gap-1 font-bold text-emerald-700 underline shrink-0 group-hover:text-emerald-900">
                  Open Google Maps ↗
                </span>
              </a>
            ) : location ? (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-between gap-2 text-xs font-semibold text-slate-700 bg-slate-100 px-3.5 py-2.5 rounded-xl border border-slate-200 transition hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-200 cursor-pointer group"
              >
                <div className="flex items-center gap-2 min-w-0 truncate">
                  <MapPin className="h-4 w-4 shrink-0 text-emerald-600" />
                  <span className="truncate">{location}</span>
                </div>
                <span className="font-bold text-emerald-700 underline shrink-0 group-hover:text-emerald-900">
                  Open Google Maps ↗
                </span>
              </a>
            ) : null}

          </section>

          {/* Photo */}

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                <Camera className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-bold">
                  Photo evidence
                </h2>

                <p className="text-xs text-slate-500">
                  Take a photo of the issue.
                </p>
              </div>

            </div>

            <div className="mt-6">

              {!photoPreview ? (

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex min-h-48 w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50"
                >

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm">
                    <Camera className="h-6 w-6 text-slate-500" />
                  </div>

                  <p className="mt-4 text-sm font-bold">
                    Take a photo
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Your phone camera will open
                  </p>

                </button>

              ) : (

                <div className="relative overflow-hidden rounded-2xl border border-slate-200">

                  <img
                    src={photoPreview}
                    alt="Captured issue"
                    className="max-h-[420px] w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={removePhoto}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>

                  <div className="absolute bottom-3 left-3 rounded-full bg-black/70 px-3 py-2 text-xs font-bold text-white">
                    Photo captured
                  </div>

                </div>

              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handlePhotoChange}
                className="hidden"
              />

            </div>

          </section>

          {/* Anonymous Reporting Option */}

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between gap-4">

              <div className="flex items-center gap-3">

                <div className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${isAnonymous ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-600"}`}>
                  {isAnonymous ? <UserX className="h-5 w-5" /> : <Shield className="h-5 w-5" />}
                </div>

                <div>
                  <h2 className="font-bold text-slate-900">
                    Report Anonymously
                  </h2>

                  <p className="text-xs text-slate-500">
                    Hide your identity & personal details on public issue listings.
                  </p>
                </div>

              </div>

              {/* Toggle Switch Button */}

              <button
                type="button"
                onClick={() => setIsAnonymous(!isAnonymous)}
                className={`relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isAnonymous ? "bg-indigo-600" : "bg-slate-200"
                }`}
                role="switch"
                aria-checked={isAnonymous}
              >
                <span
                  className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    isAnonymous ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>

            </div>

            {isAnonymous && (
              <div className="mt-4 flex items-center gap-2.5 rounded-2xl bg-amber-50/80 p-4 text-xs font-medium text-amber-900 border border-amber-200/80">
                <EyeOff className="h-4 w-4 shrink-0 text-amber-600" />
                <span>
                  <strong>Anonymous Mode Enabled:</strong> Your name and user profile will be hidden from public complaint views. Verified government officers can still process and resolve your issue.
                </span>
              </div>
            )}

          </section>

          {/* Submit */}

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <p className="text-sm text-slate-500">
              After submitting, your report will appear in your
              dashboard and can be tracked throughout its lifecycle.
            </p>

            <button
              type="submit"
              disabled={submitting}
              className="mt-5 flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 text-sm font-bold text-white hover:bg-slate-800 disabled:opacity-60"
            >

              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  {isAnonymous ? "Submit Anonymously" : "Submit report"}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}

            </button>

          </section>

        </form>

      </div>

    </main>
  );
}
