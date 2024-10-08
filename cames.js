document.addEventListener("DOMContentLoaded", () => {
    const videoElement = document.getElementById("mainVideo");
    const videoTitle = document.getElementById("videoTitle");
    const videoDescription = document.getElementById("videoDescription");
    const videoPlaylist = document.getElementById("videoPlaylist");
    const commentsList = document.getElementById("commentsList");
    const commentForm = document.getElementById("commentForm");
  
    // Change video when a playlist item is clicked
    videoPlaylist.addEventListener("click", (e) => {
      if (e.target.tagName === "LI") {
        const newVideo = e.target.getAttribute("data-video");
        const newTitle = e.target.getAttribute("data-title");
        const newDescription = e.target.getAttribute("data-description");
  
        videoElement.setAttribute("src", newVideo);
        videoTitle.textContent = newTitle;
        videoDescription.textContent = newDescription;
  
        videoElement.play(); // Autoplay the new video
      }
    });
  
    // Handle comment submission
    commentForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const commentText = document.getElementById("commentText").value;
  
      if (username && commentText) {
        // Create a new comment element
        const newComment = document.createElement("div");
        newComment.classList.add("comment");
        newComment.innerHTML = `<strong>${username}</strong><p>${commentText}</p>`;
  
        commentsList.appendChild(newComment);
  
        // Clear form fields
        document.getElementById("username").value = "";
        document.getElementById("commentText").value = "";
      }
    });
  });
  