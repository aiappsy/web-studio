
export function exportToHtml(site: any) {
  const htmlContent = `
<html>
  <head><title>${site.site.name}</title></head>
  <body>${JSON.stringify(site, null, 2)}</body>
</html>`;
  return htmlContent;
}
