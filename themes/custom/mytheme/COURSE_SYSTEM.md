# Course System Documentation

## Overview
This theme includes a comprehensive course system that displays courses on the front page and provides detailed course information via modal popups. The system is built using Twig templates and PHP functions in the theme.

## How It Works

### 1. Front Page Courses
- Courses are displayed in a grid layout on the front page
- Each course card shows: title, description, date and slots and a "Learn More" link
- Clicking "Learn More" opens a modal with detailed course information
- Course data is dynamically loaded from the `mytheme_get_course_data()` function in `mytheme.theme`



## File Structure

```
themes/custom/mytheme/
├── templates/layout/
│   └── page--front.html.twig      # Front page with course grid
├── css/components/content/
│   └── courses-section.css        # Front page course styling
├── images/
│   ├── course1.jpg               # Course images
│   ├── course2.jpg
│   └── ...
├── mytheme.theme                 # PHP functions for course data
└── COURSE_SYSTEM.md             # This documentation
```

## Adding New Courses

### 1. Add Course Data
Edit `mytheme.theme` and add your course to the `mytheme_get_course_data()` function:

```php
'your-course-slug' => [
  'title' => 'Your Course Title',
  'description' => 'Brief course description for front page',
  'image' => 'your-course-image.jpg',
  'duration' => 'X weeks',
  'start_date' => 'Month Day, Year',
  'students' => 'X,XXX',
  'level' => 'Beginner/Intermediate/Advanced',
  'price' => '$XXX',
  'available_slots' => 'XX',
  'objectives' => ['Objective 1', 'Objective 2', 'Objective 3'],
  'audience' => ['Audience 1', 'Audience 2', 'Audience 3'],
  'curriculum' => ['Week 1: Introduction', 'Week 2: Basics', 'Week 3: Advanced'],
  'instructor' => 'Instructor Name',
  'instructor_bio' => 'Instructor biography...',
],
```

### 2. Add Course Image
Place your course image in `themes/custom/mytheme/images/` with the filename specified in the course data.

## Styling
The course system uses CSS files for styling:
- `courses-section.css` - Styling for the front page course grid and modals

The CSS includes responsive design for mobile devices.

## Features
- **Dynamic Course Data**: All course information is stored in PHP functions for easy management
- **Modal Popups**: Detailed course information is displayed in modal windows
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Rich Course Information**: Each course modal includes comprehensive details
- **Professional Styling**: Modern, clean design with hover effects and animations
- **Enrollment Forms**: Interactive enrollment forms within course modals

## Customization
You can easily customize:
- Course information by editing the PHP functions
- Styling by modifying the CSS files
- Layout by editing the Twig templates
- Modal content by updating the course data structure

## Dependencies
- Font Awesome icons (for course meta information and features)
- Drupal's base theme system
- Twig templating engine 