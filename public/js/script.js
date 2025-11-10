// https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
document.addEventListener("DOMContentLoaded", () => {
  console.log("Super-HeroForHire JS imported successfully!");
  
  // Photo preview functionality for signup forms
  initPhotoPreview();
});

// Photo preview functionality
function initPhotoPreview() {
  const fileInputs = document.querySelectorAll('input[type="file"][name="imageUrl"]');
  
  fileInputs.forEach(fileInput => {
    // Create preview container if it doesn't exist
    let previewContainer = fileInput.parentElement.querySelector('.photo-preview-container');
    
    if (!previewContainer) {
      previewContainer = document.createElement('div');
      previewContainer.className = 'photo-preview-container';
      
      const previewImg = document.createElement('img');
      previewImg.className = 'photo-preview';
      previewImg.alt = 'Photo preview';
      
      const previewLabel = document.createElement('span');
      previewLabel.className = 'photo-preview-label';
      previewLabel.textContent = 'Photo preview';
      
      previewContainer.appendChild(previewImg);
      previewContainer.appendChild(previewLabel);
      
      // Insert after the file input
      fileInput.parentElement.insertBefore(previewContainer, fileInput.nextSibling);
    }
    
    // Handle file selection
    fileInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      
      if (file) {
        // Check if file is an image
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          
          reader.onload = function(e) {
            const previewImg = previewContainer.querySelector('.photo-preview');
            if (previewImg) {
              previewImg.src = e.target.result;
              previewContainer.classList.add('active');
            }
          };
          
          reader.readAsDataURL(file);
        } else {
          alert('Please select an image file (PNG or JPG)');
          fileInput.value = '';
          previewContainer.classList.remove('active');
        }
      } else {
        previewContainer.classList.remove('active');
      }
    });
  });
}
