async function testImageUpload() {
  try {
    console.log("Testing image upload endpoint...");
    
    // Create a simple test image (1x1 pixel PNG as base64)
    const base64Image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
    
    const response = await fetch("http://localhost:3000/api/upload-product-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: 1,
        fileName: "test-image.png",
        fileData: base64Image,
        contentType: "image/png",
        isPrimary: true,
      }),
    });

    console.log("Response status:", response.status);
    const data = await response.json();
    console.log("Response data:", data);
    
    if (response.ok) {
      console.log("✓ Upload successful!");
    } else {
      console.log("✗ Upload failed!");
    }
  } catch (error) {
    console.error("Test error:", error);
  }
}

testImageUpload();
