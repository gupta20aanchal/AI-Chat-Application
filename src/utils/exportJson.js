export function exportSessionAsJson(session) {
  const filename = `${session.title.replace(/\s+/g, "_")}.json`;
  const blob = new Blob([JSON.stringify(session, null, 2)], {
    type: "application/json",
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
