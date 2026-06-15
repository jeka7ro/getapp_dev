// GetApp Leads Collector
// Sheet ID: 1r34m6JRDO6JLmJTzTRL6G7tMgliUAYmkea5Qxnx4zxU

const SHEET_ID = "1r34m6JRDO6JLmJTzTRL6G7tMgliUAYmkea5Qxnx4zxU";

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    // Header automat la prima rulare
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Data", "Nume", "Telefon", "Email", "Business", "Sursa"]);
      sheet.getRange(1, 1, 1, 6).setFontWeight("bold").setBackground("#1a73e8").setFontColor("#ffffff");
    }

    sheet.appendRow([
      new Date().toLocaleString("ro-RO"),
      data.name    || "—",
      data.phone   || "—",
      data.email   || "—",
      data.business|| "—",
      data.source  || "demo_generator"
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "OK", app: "GetApp Leads" }))
    .setMimeType(ContentService.MimeType.JSON);
}
