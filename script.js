// 1. Apni Google Drive Folder ID (Corrected)
const folderId = '1BofgXcpSp8DVLnYSBeRpm-Spokjow_KS'; 

function doGet() {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Yugeshwar Naina Pic')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1, user-scalable=no')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getMedia() {
  const folder = DriveApp.getFolderById(folderId);
  const files = folder.getFiles();
  const mediaList = [];
  while (files.hasNext()) {
    const file = files.next();
    mediaList.push({
      name: file.getName(),
      id: file.getId(),
      url: "https://drive.google.com/thumbnail?id=" + file.getId() + "&sz=w1000",
      downloadUrl: "https://drive.google.com/uc?export=download&id=" + file.getId()
    });
  }
  return mediaList;
}

function uploadFile(data, fileName) {
  const folder = DriveApp.getFolderById(folderId);
  const contentType = data.substring(5, data.indexOf(';'));
  const bytes = Utilities.base64Decode(data.substring(data.indexOf('base64,') + 7));
  const file = folder.createFile(Utilities.newBlob(bytes, contentType, fileName));
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return "Success";
}

function deleteFile(fileId) {
  try {
    DriveApp.getFileById(fileId).setTrashed(true);
    return "Deleted";
  } catch(e) {
    return "Error: " + e.toString();
  }
}
function myFunction() {
  console.log("System refreshed");
}
