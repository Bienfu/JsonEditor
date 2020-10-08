// const data = JSON.stringify(design, null, 2);
// downloadFile(data, fileName, "text/json;charset=utf-8");

/**
 * Dynamically injects a <a> to download content from a web page
 *
 * @param {Object} data - data to be downloaded
 * @param {string} fileName - filename
 * @param {string} [type] - file mime type
 */
export function downloadFile(data, fileName, type="text/plain") {
    // Create an invisible A element
    const a = document.createElement("a");
    a.style.display = "none";
    document.body.appendChild(a);

    // Set the HREF to a Blob representation of the data to be downloaded
    a.href = window.URL.createObjectURL(
        new Blob([data], { type })
    );

    // Use download attribute to set set desired file name
    a.setAttribute("download", fileName);

    // Trigger the download by simulating click
    a.click();

    // Cleanup
    window.URL.revokeObjectURL(a.href);
    document.body.removeChild(a);
}