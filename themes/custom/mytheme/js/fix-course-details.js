/**
 * Fix Course Details Modal
 * This script ensures all courses have proper details in the modal
 * and handles missing data gracefully.
 */

document.addEventListener('DOMContentLoaded', function() {
  // Override the showCourseDetails function to handle missing data
  const originalShowCourseDetails = window.showCourseDetails;
  
  window.showCourseDetails = function(courseSlug, courseTitle) {
    const course = courseData[courseSlug];
    if (!course) {
      console.error('Course data not found for:', courseSlug);
      alert('Course details are not available at the moment. Please try again later.');
      return;
    }

    const modal = document.getElementById('courseModal');
    const content = document.getElementById('courseModalContent');
    
    const slotsText = course.available_slots > 0 ? `${course.available_slots} slots available` : 'Not available';
    const slotsClass = course.available_slots > 0 ? 'available' : 'unavailable';
    const slotsIcon = course.available_slots > 0 ? 'fas fa-users' : 'fas fa-times-circle';
    
    // Ensure objectives and audience arrays exist with fallback data
    const objectives = course.objectives && course.objectives.length > 0 ? course.objectives : [
      'Learn industry-standard tools and technologies',
      'Develop practical skills through hands-on projects',
      'Understand best practices and methodologies',
      'Build a professional portfolio of work',
      'Gain real-world experience and insights',
      'Prepare for career advancement opportunities'
    ];
    
    const audience = course.audience && course.audience.length > 0 ? course.audience : [
      'Professionals looking to advance their careers',
      'Students seeking practical skills and knowledge',
      'Career changers wanting to enter new fields',
      'Anyone interested in learning and growing'
    ];
    
    content.innerHTML = `
      <div class="course-details-section">
        <div class="course-details-content">
          <div class="course-header">
            <div class="course-image">
              <img src="${window.location.origin}/drupal/themes/custom/mytheme/images/${course.image}" alt="${course.title}">
            </div>
            <div class="course-info">
              <h1>${course.title}</h1>
              <p class="course-description">${course.description}</p>
              <div class="course-meta">
                <div class="meta-item">
                  <i class="fas fa-calendar"></i>
                  <span>Course Date: ${course.course_date}</span>
                </div>
                <div class="meta-item">
                  <i class="${slotsIcon}"></i>
                  <span class="${slotsClass}">${slotsText}</span>
                </div>
              </div>
              <div class="course-actions">
                ${course.available_slots > 0 ? '<button class="enroll-button" onclick="showEnrollmentForm(\'' + courseSlug + '\', \'' + course.title + '\')">Enroll Now</button>' : '<span class="enroll-button disabled">Fully Booked</span>'}
              </div>
            </div>
          </div>

          <div class="course-content">
            <div class="content-section">
              <h2>What You'll Learn</h2>
              <p class="learning-objectives">
                ${objectives.join(', ')}
              </p>
            </div>

            <div class="content-section">
              <h2>Who This Course Is For</h2>
              <p class="audience-list">
                ${audience.join(', ')}
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
    
    modal.style.display = 'block';
    
    // Handle modal image loading
    setTimeout(() => {
      const modalImage = content.querySelector('.course-image img');
      const modalImageContainer = content.querySelector('.course-image');
      
      if (modalImage && modalImageContainer) {
        console.log('Modal image found:', modalImage.src);
        
        // Add loading state
        modalImageContainer.classList.add('loading');
        
        // If image is already loaded
        if (modalImage.complete) {
          console.log('Image already loaded');
          modalImageContainer.classList.remove('loading');
          modalImage.classList.add('loaded');
        } else {
          console.log('Image loading...');
          
          // Handle image load event
          modalImage.addEventListener('load', function() {
            console.log('Image loaded successfully');
            modalImageContainer.classList.remove('loading');
            modalImage.classList.add('loaded');
          });
          
          // Handle image error
          modalImage.addEventListener('error', function() {
            console.log('Image failed to load');
            modalImageContainer.classList.remove('loading');
            modalImage.style.display = 'none';
            // Add a placeholder icon
            const placeholder = document.createElement('div');
            placeholder.innerHTML = '<i class="fas fa-image" style="font-size: 3rem; color: #ccc;"></i>';
            placeholder.style.cssText = 'display: flex; align-items: center; justify-content: center; height: 100%; width: 100%;';
            modalImageContainer.appendChild(placeholder);
          });
        }
      } else {
        console.log('Modal image or container not found');
      }
    }, 100);
  };
}); 