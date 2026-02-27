"use client";

import { useState } from "react";
import { Save, Upload, Globe, Building2, Users, FileImage, CheckCircle, XCircle, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui";
import { SITE_CONFIG, TEAM_MEMBERS } from "@/lib/constants";
import { checkStorageHealth } from "@/lib/storage";

/* --------------------------------------------------------
   Admin Site Settings
   Editable sections: Company Info, About Page Content,
   Hero Content, Team Members, SEO
   --------------------------------------------------------
   NOTE: Currently saves to local state (mock).
   When Supabase is connected, these will persist to DB.
   -------------------------------------------------------- */

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<string>("company");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  /* Company info state */
  const [companyName, setCompanyName] = useState<string>(SITE_CONFIG.name);
  const [tagline, setTagline] = useState<string>(SITE_CONFIG.tagline);
  const [email, setEmail] = useState<string>(SITE_CONFIG.email);
  const [phone, setPhone] = useState<string>(SITE_CONFIG.phone);
  const [address, setAddress] = useState<string>(SITE_CONFIG.address.full);
  const [businessHours, setBusinessHours] = useState<string>(SITE_CONFIG.businessHours);
  const [linkedin, setLinkedin] = useState<string>(SITE_CONFIG.social.linkedin);

  /* About page state */
  const [aboutStory, setAboutStory] = useState(
    "ASZ Company FZCO, established in 2022 and headquartered in Dubai, is an international trading company active in noble alloys, ferro alloys, and minor metals. The company's leadership brings industry experience developed prior to its establishment, supplying producers, steelmakers, and industrial consumers globally."
  );
  const [aboutStoryP2, setAboutStoryP2] = useState(
    "Our journey began with a simple mission: to bridge the gap between metal producers and consumers with reliable, transparent, and efficient trading services. We've built lasting relationships with mines, smelters, and manufacturers across Asia, Europe, Africa, and the Americas."
  );
  const [mission, setMission] = useState(
    "To be the most trusted and reliable partner in the global metals trading industry, connecting quality suppliers with customers worldwide while maintaining the highest standards of integrity, service, and sustainability."
  );
  const [vision, setVision] = useState(
    "To become the leading ferro alloys and minor metals trading company, recognised globally for our integrity, expertise, and commitment to customer success."
  );

  /* Hero content state */
  const [heroBadge, setHeroBadge] = useState("Built on Industry Experience");
  const [heroHeadline, setHeroHeadline] = useState(
    "International Noble & Ferro Alloy Trading"
  );
  const [heroSubheadline, setHeroSubheadline] = useState(
    "Delivering premium metals and alloys to global markets with reliability, transparency, and competitive value from Dubai."
  );

  /* SEO state */
  const [siteTitle, setSiteTitle] = useState(
    "ASZ Company FZCO | International Noble & Ferro Alloy Trading"
  );
  const [siteDescription, setSiteDescription] = useState<string>(SITE_CONFIG.description);

  async function handleSave() {
    setSaving(true);
    // Mock save — replace with Supabase upsert when connected
    await new Promise((r) => setTimeout(r, 800));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const tabs = [
    { id: "company", label: "Company Info", icon: Building2 },
    { id: "about", label: "About Page", icon: Users },
    { id: "hero", label: "Hero Section", icon: Globe },
    { id: "images", label: "Images", icon: FileImage },
    { id: "seo", label: "SEO & Meta", icon: Globe },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
            Site Settings
          </h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Manage your website content, company information, and SEO settings.
          </p>
        </div>
        <Button
          onClick={handleSave}
          loading={saving}
          leftIcon={<Save className="h-4 w-4" />}
        >
          {saved ? "Saved!" : "Save Changes"}
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 mb-8 bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border)] overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-md whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-[var(--color-accent)] text-white"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Company Info Tab */}
      {activeTab === "company" && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="label">Company Name</label>
              <input
                type="text"
                className="input"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
            <div>
              <label className="label">Tagline</label>
              <input
                type="text"
                className="input"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
              />
            </div>
            <div>
              <label className="label">Email Address</label>
              <input
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="label">Phone Number</label>
              <input
                type="text"
                className="input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label className="label">Address</label>
              <input
                type="text"
                className="input"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <label className="label">Business Hours</label>
              <input
                type="text"
                className="input"
                value={businessHours}
                onChange={(e) => setBusinessHours(e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="label">LinkedIn URL</label>
              <input
                type="url"
                className="input"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </div>
          </div>
        </div>
      )}

      {/* About Page Tab */}
      {activeTab === "about" && (
        <div className="space-y-6">
          <div>
            <label className="label">Our Story — Paragraph 1</label>
            <textarea
              className="input min-h-[120px]"
              value={aboutStory}
              onChange={(e) => setAboutStory(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Our Story — Paragraph 2</label>
            <textarea
              className="input min-h-[120px]"
              value={aboutStoryP2}
              onChange={(e) => setAboutStoryP2(e.target.value)}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="label">Mission Statement</label>
              <textarea
                className="input min-h-[100px]"
                value={mission}
                onChange={(e) => setMission(e.target.value)}
              />
            </div>
            <div>
              <label className="label">Vision Statement</label>
              <textarea
                className="input min-h-[100px]"
                value={vision}
                onChange={(e) => setVision(e.target.value)}
              />
            </div>
          </div>

          {/* Team Members */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-4">
              Team Members
            </h3>
            <div className="space-y-3">
              {TEAM_MEMBERS.map((member, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)]"
                >
                  <div className="flex-1 grid grid-cols-3 gap-4">
                    <input
                      className="input"
                      defaultValue={member.name}
                      placeholder="Full Name"
                    />
                    <input
                      className="input"
                      defaultValue={member.role}
                      placeholder="Role / Title"
                    />
                    <input
                      className="input"
                      defaultValue={member.department || ""}
                      placeholder="Department"
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-[var(--color-text-muted)] mt-2">
              To add or remove team members, contact your developer.
              When Supabase is connected this will be fully dynamic.
            </p>
          </div>
        </div>
      )}

      {/* Hero Section Tab */}
      {activeTab === "hero" && (
        <div className="space-y-6">
          <div>
            <label className="label">Badge Text</label>
            <input
              type="text"
              className="input"
              value={heroBadge}
              onChange={(e) => setHeroBadge(e.target.value)}
            />
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              The small label that appears above the main headline.
            </p>
          </div>
          <div>
            <label className="label">Main Headline</label>
            <input
              type="text"
              className="input"
              value={heroHeadline}
              onChange={(e) => setHeroHeadline(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Subheadline</label>
            <textarea
              className="input min-h-[80px]"
              value={heroSubheadline}
              onChange={(e) => setHeroSubheadline(e.target.value)}
            />
          </div>
          <div className="p-4 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
            <p className="text-sm text-[var(--color-text-secondary)]">
              <strong className="text-[var(--color-text-primary)]">Note:</strong>{" "}
              Trust statistics (30+ Countries, 24+ Products, etc.) and the trade
              network visual are configured in the code. Contact your developer
              to update these values.
            </p>
          </div>
        </div>
      )}

      {/* Images Tab */}
      {activeTab === "images" && (
        <div className="space-y-6">
          {/* Storage Health Check */}
          <StorageDiagnostic />

          {/* About page image */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
              About Page — Company Image
            </h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-4">
              This image appears in the &quot;Our Story&quot; section of the About page.
              Recommended size: 800×600px.
            </p>
            <div className="border-2 border-dashed border-[var(--color-border)] rounded-xl p-8 text-center hover:border-[var(--color-accent)] transition-colors cursor-pointer">
              <Upload className="h-8 w-8 mx-auto text-[var(--color-text-muted)] mb-3" />
              <p className="text-sm font-medium text-[var(--color-text-primary)] mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">
                PNG, JPG or WebP (max. 5MB)
              </p>
            </div>
          </div>

          {/* Product images note */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
              Product Images
            </h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-4">
              Product images can be uploaded from the individual product editor
              pages. Go to{" "}
              <a
                href="/admin/products"
                className="text-[var(--color-accent)] hover:underline"
              >
                Products → Edit
              </a>{" "}
              to upload images for each product.
            </p>
          </div>

          {/* Logo */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
              Company Logo
            </h3>
            <p className="text-sm text-[var(--color-text-muted)] mb-4">
              Used in the header, footer, and SEO. Upload a transparent PNG for
              best results.
            </p>
            <div className="border-2 border-dashed border-[var(--color-border)] rounded-xl p-8 text-center hover:border-[var(--color-accent)] transition-colors cursor-pointer">
              <Upload className="h-8 w-8 mx-auto text-[var(--color-text-muted)] mb-3" />
              <p className="text-sm font-medium text-[var(--color-text-primary)] mb-1">
                Click to upload logo
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">
                Transparent PNG recommended (max. 2MB)
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SEO Tab */}
      {activeTab === "seo" && (
        <div className="space-y-6">
          <div>
            <label className="label">Site Title</label>
            <input
              type="text"
              className="input"
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
            />
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              Appears in browser tabs and search results. Keep under 60
              characters.
            </p>
          </div>
          <div>
            <label className="label">Meta Description</label>
            <textarea
              className="input min-h-[80px]"
              value={siteDescription}
              onChange={(e) => setSiteDescription(e.target.value)}
            />
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              Appears in search engine results. Keep under 160 characters.
            </p>
          </div>
          <div>
            <label className="label">Privacy Policy Text</label>
            <p className="text-sm text-[var(--color-text-muted)] mb-2">
              Edit the privacy policy at{" "}
              <a
                href="/privacy"
                target="_blank"
                className="text-[var(--color-accent)] hover:underline"
              >
                /privacy
              </a>
              . Currently hardcoded — when Supabase is connected, this will be
              editable here as a rich text editor.
            </p>
          </div>
          <div>
            <label className="label">Terms &amp; Conditions Text</label>
            <p className="text-sm text-[var(--color-text-muted)] mb-2">
              Edit the terms at{" "}
              <a
                href="/terms"
                target="_blank"
                className="text-[var(--color-accent)] hover:underline"
              >
                /terms
              </a>
              . Currently hardcoded — when Supabase is connected, this will be
              editable here as a rich text editor.
            </p>
          </div>
        </div>
      )}

      {/* Supabase notice */}
      <div className="mt-8 p-4 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)]">
        <p className="text-sm text-[var(--color-text-secondary)]">
          <strong className="text-[var(--color-text-primary)]">
            Database not connected
          </strong>{" "}
          — Changes are currently saved to your browser only. Once Supabase is
          connected, all settings, images, and content will persist to the
          database and be accessible from any device.
        </p>
      </div>
    </div>
  );
}

/* ---- Storage Diagnostic Widget ---- */
type HealthResult = Awaited<ReturnType<typeof checkStorageHealth>>;

function StorageDiagnostic() {
  const [result, setResult] = useState<HealthResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function runCheck() {
    setLoading(true);
    try {
      const r = await checkStorageHealth();
      setResult(r);
    } catch (err) {
      setResult({
        configured: false,
        bucketExists: false,
        bucketPublic: false,
        canUpload: false,
        error: err instanceof Error ? err.message : "Unknown error",
      });
    } finally {
      setLoading(false);
    }
  }

  const Check = ({ ok, label }: { ok: boolean; label: string }) => (
    <div className="flex items-center gap-2 text-sm">
      {ok ? (
        <CheckCircle className="h-4 w-4 text-green-500" />
      ) : (
        <XCircle className="h-4 w-4 text-red-500" />
      )}
      <span className={ok ? "text-green-700" : "text-red-700"}>{label}</span>
    </div>
  );

  return (
    <div className="p-4 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-semibold text-[var(--color-text-primary)]">
          Storage Health Check
        </h3>
        <Button variant="secondary" size="sm" onClick={runCheck} loading={loading}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-1" />
          )}
          {result ? "Re-check" : "Run Check"}
        </Button>
      </div>

      {!result && !loading && (
        <p className="text-sm text-[var(--color-text-muted)]">
          Click &ldquo;Run Check&rdquo; to diagnose image storage configuration.
          This verifies the Supabase Storage bucket exists, is public, and accepts uploads.
        </p>
      )}

      {result && (
        <div className="space-y-2">
          <Check ok={result.configured} label="Supabase configured" />
          <Check ok={result.bucketExists} label='Storage bucket "images" exists' />
          <Check ok={result.canUpload} label="Can upload images" />
          <Check ok={result.bucketPublic} label="Images are publicly accessible" />
          {result.error && (
            <div className="mt-3 p-3 rounded-md bg-red-50 border border-red-200 text-sm text-red-800">
              {result.error}
            </div>
          )}
          {!result.error && result.bucketPublic && (
            <div className="mt-3 p-3 rounded-md bg-green-50 border border-green-200 text-sm text-green-800">
              Storage is correctly configured. Images should display on the website.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
