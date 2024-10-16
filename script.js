// Selects the layout image and saves it to local storage
function selectLayout(imagePath) {
    localStorage.setItem('selectedLayout', imagePath);
    window.location.href = 'furniture-page.html';
}

// Load the selected layout image when the furniture page is accessed
window.onload = function() {
    const selectedLayout = localStorage.getItem('selectedLayout');
    const imgContainer = document.getElementById('img-container');

    if (selectedLayout) {
        const imgElement = document.createElement('img');
        imgElement.src = selectedLayout;
        imgElement.id = 'resizable';
        imgElement.style.position = 'absolute';
        imgElement.style.cursor = 'move';
        imgElement.style.width = '300px'; // Default width
        imgElement.style.height = 'auto'; // Maintain aspect ratio
        imgElement.style.transformOrigin = 'center'; // Set transform origin for rotation
        imgContainer.appendChild(imgElement);

        // Create a delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete Image';
        deleteButton.style.position = 'absolute';
        deleteButton.style.top = '60px'; // Position below the navbar
        deleteButton.style.right = '20px'; // Align right
        deleteButton.style.zIndex = '1000'; // Ensure it's on top
        deleteButton.className = 'btn btn-danger';
        imgContainer.appendChild(deleteButton);

        // Create rotate buttons
        const rotateLeftButton = document.createElement('button');
        rotateLeftButton.innerText = 'Rotate Left';
        rotateLeftButton.style.position = 'absolute';
        rotateLeftButton.style.top = '100px';
        rotateLeftButton.style.right = '20px';
        rotateLeftButton.className = 'btn btn-warning';
        imgContainer.appendChild(rotateLeftButton);

        const rotateRightButton = document.createElement('button');
        rotateRightButton.innerText = 'Rotate Right';
        rotateRightButton.style.position = 'absolute';
        rotateRightButton.style.top = '100px';
        rotateRightButton.style.right = '130px'; // Position next to left button
        rotateRightButton.className = 'btn btn-warning';
        imgContainer.appendChild(rotateRightButton);

        makeResizableAndDraggable(imgElement, deleteButton, rotateLeftButton, rotateRightButton);
    }
};

// Make the image resizable and draggable
function makeResizableAndDraggable(imgElement, deleteButton, rotateLeftButton, rotateRightButton) {
    let rotation = 0; // Initial rotation angle

    imgElement.onmousedown = function(event) {
        // To handle image drag
        let shiftX = event.clientX - imgElement.getBoundingClientRect().left;
        let shiftY = event.clientY - imgElement.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
            imgElement.style.left = pageX - shiftX + 'px';
            imgElement.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        imgElement.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            imgElement.onmouseup = null;
        };
    };

    imgElement.ondragstart = function() {
        return false; // Prevent default drag behavior
    };

    // Make the image resizable
    imgElement.addEventListener('wheel', function(event) {
        event.preventDefault(); // Prevent page scrolling

        if (event.deltaY < 0) {
            imgElement.style.width = (imgElement.offsetWidth * 1.1) + 'px'; // Increase size
        } else {
            imgElement.style.width = (imgElement.offsetWidth / 1.1) + 'px'; // Decrease size
        }
    });

    // Add click event to delete the image
    deleteButton.onclick = function() {
        imgElement.remove(); // Remove the image
        deleteButton.remove(); // Remove the delete button
        rotateLeftButton.remove(); // Remove the rotate left button
        rotateRightButton.remove(); // Remove the rotate right button
        localStorage.removeItem('selectedLayout'); // Optionally clear local storage
    };

    // Add rotation functionality
    rotateLeftButton.onclick = function() {
        rotation -= 90; // Rotate left by 90 degrees
        imgElement.style.transform = `rotate(${rotation}deg)`; // Apply rotation
    };

    rotateRightButton.onclick = function() {
        rotation += 90; // Rotate right by 90 degrees
        imgElement.style.transform = `rotate(${rotation}deg)`; // Apply rotation
    };
}
