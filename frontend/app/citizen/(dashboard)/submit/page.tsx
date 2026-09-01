"use client";

import { useEffect, useRef, useState } from "react";
import jsPDF from "jspdf";
import Link from "next/link";
import {
  Camera,
  Upload,
  MapPin,
  CheckCircle2,
  Download,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  RefreshCw,
  Sparkles,
} from "lucide-react";

const PROBLEM_CATEGORIES = [
  "Water Resources",
  "Roads & Bridges",
  "Healthcare",
  "Education",
  "Agriculture",
  "Irrigation",
  "Electricity & Energy",
  "Sanitation & Drainage",
  "Waste Management",
  "Environment & Pollution",
  "Public Transport",
  "Street Lighting",
  "Internet & Digital Connectivity",
  "Women's Safety",
  "Child Welfare",
  "Accessibility",
  "Public Administration",
  "Rural Livelihoods",
  "Housing",
  "Forest & Wildlife",
  "Flood & Disaster Management",
  "Employment & Skill Development",
  "Clean Drinking Water",
  "Other",
];

export default function SubmitPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [photo, setPhoto] = useState<string | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [anonymous, setAnonymous] = useState(false);
  const [domain, setDomain] = useState(PROBLEM_CATEGORIES[0]);

  const [location, setLocation] = useState({
    district: "",
    subdivision: "",
    address: "",
    lat: null as number | null,
    lng: null as number | null,
  });

  const [loadingLocation, setLoadingLocation] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [challengeData, setChallengeData] = useState<any>(null);

  const getLiveLocation = async (retry = 0): Promise<boolean> => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return false;
    }

    setLoadingLocation(true);

    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
            );

            const data = await res.json();

            const district =
              data.address?.state_district || data.address?.county || "";

            if (!district) {
              if (retry < 2) {
                setLoadingLocation(false);
                setTimeout(async () => resolve(await getLiveLocation(retry + 1)), 1000);
                return;
              }

              setLocation({
                district: "Not Detected",
                subdivision: "Not Detected",
                address: "Not Detected",
                lat: 0,
                lng: 0,
              });

              setLoadingLocation(false);
              resolve(false);
              return;
            }

            setLocation({
              district,
              subdivision:
                data.address?.suburb ||
                data.address?.city ||
                data.address?.town ||
                data.address?.village ||
                "",
              address: data.display_name,
              lat: latitude,
              lng: longitude,
            });

            setLoadingLocation(false);
            resolve(true);
          } catch {
            if (retry < 2) {
              setLoadingLocation(false);
              setTimeout(async () => resolve(await getLiveLocation(retry + 1)), 1000);
              return;
            }

            setLocation({
              district: "Not Detected",
              subdivision: "Not Detected",
              address: "Not Detected",
              lat: 0,
              lng: 0,
            });

            setLoadingLocation(false);
            resolve(false);
          }
        },
        async () => {
          if (retry < 2) {
            setLoadingLocation(false);
            setTimeout(async () => resolve(await getLiveLocation(retry + 1)), 1000);
            return;
          }

          alert("Unable to detect your location after 3 attempts.");
          setLoadingLocation(false);
          resolve(false);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    });
  };

  useEffect(() => {
    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      if (!videoRef.current) return;

      videoRef.current.srcObject = stream;

      await new Promise<void>((resolve) => {
        videoRef.current!.onloadedmetadata = () => resolve();
      });

      await videoRef.current.play();
      setCameraOpen(true);
    } catch (err) {
      console.error("Camera Error:", err);
      alert("Unable to access camera. Please allow camera permissions in browser.");
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const image = canvas.toDataURL("image/jpeg", 0.9);
    setPhoto(image);

    const stream = video.srcObject as MediaStream;
    stream?.getTracks().forEach((track) => track.stop());
    video.srcObject = null;
    setCameraOpen(false);
  };

  const closeCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraOpen(false);
  };

  if (submitted && challengeData) {
    return (
      <div className="mx-auto max-w-3xl py-6">
        <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#0c2340]">
                Challenge Submitted Successfully
              </h1>
              <p className="text-sm text-slate-500">
                Your report has been securely registered on the Samadhan Grid.
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-4 rounded-2xl bg-slate-50 p-6 border border-slate-200/70">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Tracking ID
                </p>
                <p className="mt-1 font-mono text-sm font-bold text-[#0c2340]">
                  {challengeData.id}
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Status
                </p>
                <p className="mt-1 text-sm font-bold text-[#2d8a9e]">
                  {challengeData.status}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Title
              </p>
              <p className="mt-1 text-sm font-semibold text-[#0c2340]">
                {challengeData.title}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Category
              </p>
              <p className="mt-1 text-sm text-slate-700">
                {challengeData.category}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Location
              </p>
              <p className="mt-1 text-sm text-slate-700">
                {challengeData.location.address || challengeData.location.district}
              </p>
            </div>

            {challengeData.photo && (
              <div className="pt-2">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Evidence Photo
                </p>
                <img
                  src={challengeData.photo}
                  alt="Evidence"
                  className="max-h-60 w-full rounded-xl border border-slate-200 object-cover"
                />
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => {
                const doc = new jsPDF();
                const cleanText = (text = "") =>
                  text
                    .replace(/[^\x20-\x7E]/g, " ")
                    .replace(/\s+/g, " ")
                    .trim();

                doc.setFillColor(12, 35, 64); // Navy #0c2340
                doc.rect(0, 0, 210, 28, "F");

                doc.setTextColor(255, 255, 255);
                doc.setFont("helvetica", "bold");
                doc.setFontSize(18);
                doc.text("Samadhan Civic Platform", 15, 14);

                doc.setFontSize(10);
                doc.setFont("helvetica", "normal");
                doc.text("Official Citizen Challenge Submission Receipt", 15, 22);

                doc.setTextColor(12, 35, 64);
                doc.setFontSize(11);

                let y = 42;
                const addField = (label: string, value: string) => {
                  doc.setFont("helvetica", "bold");
                  doc.text(`${label}:`, 15, y);

                  doc.setFont("helvetica", "normal");
                  const lines = doc.splitTextToSize(cleanText(value), 135);
                  doc.text(lines, 55, y);

                  y += lines.length * 7 + 2;
                };

                addField("Challenge ID", challengeData.id);
                addField("Title", challengeData.title);
                addField("Category", challengeData.category);
                addField("District", challengeData.location.district);
                addField("Location", challengeData.location.address);
                addField("Status", challengeData.status);
                addField("Anonymous", challengeData.anonymous ? "Yes" : "No");
                addField("Submitted At", challengeData.submittedAt);

                y += 4;
                doc.setFont("helvetica", "bold");
                doc.setFontSize(13);
                doc.text("Problem Description", 15, y);

                y += 7;
                doc.setFont("helvetica", "normal");
                doc.setFontSize(10);
                const desc = doc.splitTextToSize(
                  cleanText(challengeData.description),
                  180
                );
                doc.text(desc, 15, y);

                if (challengeData.photo) {
                  doc.addPage();
                  doc.setFillColor(12, 35, 64);
                  doc.rect(0, 0, 210, 25, "F");

                  doc.setTextColor(255, 255, 255);
                  doc.setFont("helvetica", "bold");
                  doc.setFontSize(16);
                  doc.text("Photo Evidence Verification", 15, 16);

                  doc.setTextColor(100, 116, 139);
                  doc.setFontSize(10);
                  doc.setFont("helvetica", "normal");
                  doc.text(
                    "Attachment for Challenge ID: " + challengeData.id,
                    15,
                    36
                  );

                  const imageType = challengeData.photo.startsWith("data:image/png")
                    ? "PNG"
                    : "JPEG";

                  doc.addImage(
                    challengeData.photo,
                    imageType,
                    15,
                    44,
                    180,
                    130
                  );
                }

                doc.save("Samadhan-" + challengeData.id + ".pdf");
              }}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0c2340] px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#1a4a6e]"
            >
              <Download className="h-4 w-4" />
              Download PDF Receipt
            </button>

            <Link
              href="/citizen/dashboard"
              className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-[#0c2340] shadow-sm transition hover:bg-slate-50"
            >
              Return to Feed
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Title: Deep navy #0c2340 */}
      <div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#5cbdb9]/15 border border-[#5cbdb9]/30 px-2.5 py-0.5 text-xs font-bold text-[#0c2340]">
            Citizen Grievance Submission
          </span>
        </div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#0c2340] sm:text-3xl">
          Report a Local Civic Challenge
        </h1>
        {/* Subtitle / secondary text: Muted slate gray */}
        <p className="mt-1 text-sm text-slate-500">
          Provide problem details, attach verified evidence, and initiate resolution across departments.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Submission Progress
            </p>

            <div className="space-y-3">
              {[
                { num: 1, label: "Problem Details", desc: "Title, category & description" },
                { num: 2, label: "Live Location", desc: "GPS coordinates & district" },
                { num: 3, label: "Evidence & Submit", desc: "Photo proof & receipt" },
              ].map((item) => {
                const isCurrent = step === item.num;
                const isDone = step > item.num;

                return (
                  <div
                    key={item.num}
                    className={
                      "flex items-start gap-3.5 rounded-xl p-3 transition " +
                      (isCurrent
                        ? "bg-[#5cbdb9]/10 border border-[#5cbdb9]/25"
                        : "bg-transparent")
                    }
                  >
                    <div
                      className={
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold transition " +
                        (isDone
                          ? "bg-emerald-600 text-white"
                          : isCurrent
                            ? "bg-[#0c2340] text-white shadow-sm"
                            : "bg-slate-100 text-slate-400")
                      }
                    >
                      {isDone ? <CheckCircle2 className="h-4 w-4" /> : item.num}
                    </div>

                    <div>
                      <p
                        className={
                          "text-sm font-bold " +
                          (isCurrent ? "text-[#0c2340]" : "text-slate-600")
                        }
                      >
                        {item.label}
                      </p>
                      <p className="text-xs text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                AI Triage & SLA Estimate
              </p>
              <Sparkles className="h-4 w-4 text-[#2d8a9e]" />
            </div>

            <h3 className="mt-3 text-lg font-bold text-[#0c2340]">{domain}</h3>

            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-[65%] rounded-full bg-[#0c2340] transition-all duration-300" />
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Estimated department routing time:{" "}
              <span className="font-semibold text-[#0c2340]">48 hours</span>
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Challenge Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Village hand pump dry for three weeks"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#0c2340] outline-none transition focus:border-[#0c2340]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Domain Category *
                </label>
                {/* Dropdowns: White background, light gray border, navy text */}
                <select
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#0c2340] outline-none transition focus:border-[#0c2340]"
                >
                  {PROBLEM_CATEGORIES.map((cat) => (
                    <option key={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                  Detailed Description *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  placeholder="Explain the background, how many people are affected, and any urgency..."
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#0c2340] outline-none transition focus:border-[#0c2340]"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/70 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-[#2d8a9e]" />
                    <h3 className="font-bold text-[#0c2340]">
                      Geotagged Location
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      void getLiveLocation();
                    }}
                    disabled={loadingLocation}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-[#0c2340] shadow-sm transition hover:bg-[#5cbdb9]/10 disabled:opacity-50"
                  >
                    <RefreshCw className={"h-3.5 w-3.5 " + (loadingLocation ? "animate-spin" : "")} />
                    {loadingLocation ? "Detecting..." : "Refresh GPS"}
                  </button>
                </div>

                {location.district ? (
                  <div className="space-y-3 pt-2">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        District
                      </p>
                      <p className="text-base font-bold text-[#0c2340]">
                        {location.district}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Full Address
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {location.address}
                      </p>
                    </div>

                    {location.lat && location.lng && (
                      <p className="font-mono text-xs text-[#2d8a9e] font-semibold">
                        {"Coordinates: " + location.lat.toFixed(5) + ", " + location.lng.toFixed(5)}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="py-6 text-center">
                    <p className="text-sm text-slate-500">
                      Click the button below to automatically detect your current live location.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        void getLiveLocation();
                      }}
                      className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#0c2340] px-5 py-2.5 text-xs font-bold text-white shadow transition hover:bg-[#1a4a6e]"
                    >
                      <MapPin className="h-4 w-4" />
                      Detect Live Location
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Canvas always in DOM for capture - video is inside the camera panel below */}
          <canvas ref={canvasRef} className="hidden" />

          {step === 3 && (
            <div className="space-y-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                Photo Evidence *
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={openCamera}
                  className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white p-6 text-center transition hover:border-[#2d8a9e] hover:bg-[#5cbdb9]/10"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#5cbdb9]/10 text-[#0c2340] shadow-sm">
                    <Camera className="h-6 w-6 text-[#2d8a9e]" />
                  </div>
                  <p className="mt-3 text-sm font-bold text-[#0c2340]">
                    Open Web Camera
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Take a live photo on device
                  </p>
                </button>

                <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white p-6 text-center transition hover:border-[#2d8a9e] hover:bg-[#5cbdb9]/10">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;

                      const reader = new FileReader();
                      reader.onload = () => setPhoto(reader.result as string);
                      reader.readAsDataURL(file);
                    }}
                  />
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700 shadow-sm">
                    <Upload className="h-6 w-6 text-slate-700" />
                  </div>
                  <p className="mt-3 text-sm font-bold text-[#0c2340]">
                    Upload from Gallery
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    PNG, JPG up to 10MB
                  </p>
                </label>
              </div>

              {/* Camera panel: video always in DOM so ref is never null */}
              <div className={"rounded-2xl border border-slate-200 bg-[#0c2340] p-4" + (cameraOpen ? "" : " hidden")}>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="h-64 w-full rounded-xl object-cover"
                />

                <div className="mt-3 flex gap-3">
                  <button
                    type="button"
                    onClick={capturePhoto}
                    className="flex-1 rounded-xl bg-[#2d8a9e] py-2.5 text-xs font-bold text-white shadow hover:bg-[#1a4a6e]"
                  >
                    Capture Photo
                  </button>
                  <button
                    type="button"
                    onClick={closeCamera}
                    className="rounded-xl border border-white/20 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/10"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              {photo && (
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Evidence Preview
                  </p>
                  <img
                    src={photo}
                    alt="Captured"
                    className="h-48 w-full rounded-xl border border-slate-200 object-cover"
                  />
                </div>
              )}

              <div className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-slate-50 p-4">
                <div>
                  <p className="text-sm font-bold text-[#0c2340]">
                    Submit Anonymously
                  </p>
                  <p className="text-xs text-slate-400">
                    Hide personal details from public challenge feed
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setAnonymous(!anonymous)}
                  className={
                    "relative h-6 w-11 rounded-full transition " +
                    (anonymous ? "bg-[#0c2340]" : "bg-slate-300")
                  }
                >
                  <div
                    className={
                      "absolute top-1 h-4 w-4 rounded-full bg-white transition " +
                      (anonymous ? "left-6" : "left-1")
                    }
                  />
                </button>
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-[#0c2340] transition hover:bg-slate-50"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous Step
              </button>
            ) : (
              <div />
            )}

            {/* Submit Challenge CTA: Deep navy #0c2340 background with white text; hover to mid blue #1a4a6e */}
            <button
              type="button"
              onClick={async () => {
                if (step === 1) {
                  if (!title.trim() || !description.trim()) {
                    alert("Please fill in both the title and problem description.");
                    return;
                  }
                  setStep(2);
                  return;
                }

                if (step === 2) {
                  const detected = await getLiveLocation();

                  if (!detected) return; // Stay on Step 2 if location wasn't detected

                  setStep(3);
                  return;
                }

                if (step === 3) {
                  if (!photo) {
                    alert("Please capture or upload photo evidence before submitting.");
                    return;
                  }

                  const data = {
                    id: "SMD-" + Date.now().toString().slice(-6),
                    title,
                    description,
                    category: domain,
                    anonymous,
                    location,
                    photo,
                    status: "Submitted",
                    submittedAt: new Date().toLocaleString(),
                  };

                  sessionStorage.setItem("samadhanChallenge", JSON.stringify(data));
                  setChallengeData(data);
                  setSubmitted(true);
                }
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-[#0c2340] px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-[#1a4a6e]"
            >
              {step < 3 ? (
                <>
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </>
              ) : (
                "Submit Challenge"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
