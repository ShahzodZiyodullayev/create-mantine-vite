type SEOProps = {
  title: string;
  description?: string;
  ogImage?: string;
  noIndex?: boolean;
  jsonLd?: Record<string, unknown>;
};

const SITE_NAME = "Mantine Vite Template";

export const SEO = ({ title, description, ogImage, noIndex, jsonLd }: SEOProps) => {
  const fullTitle = `${title} — ${SITE_NAME}`;
  return (
    <>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {description && <meta property="og:description" content={description} />}
      <meta property="og:title" content={fullTitle} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      {noIndex && <meta name="robots" content="noindex" />}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  );
};
