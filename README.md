### Url to check request from prog.php ###

http://localhost:8888/api/users/save



#  Medical Community Patron Booking App

  In summary, this code is used to create reservations with their local doctors that involves forms on a React.js component connecting within a Mongoose database. This kind of code can be used for web-based projects,  simply to showcase prior knowledge, or as an open-source scaffold to support multiple ideas.*/

https://github.com/abem7787/-Web-base-Interactive-Design/assets/121057489/ee374978-d346-41f1-9186-a149e899c6e0
  
1. **Admin Login & Password:**
     login: admin
     password: admin.
  
  3. **Components and Functions:**
     - Components are used as static or reusable pieces of code. In this case, the compoenent takes a values to return outputs or inputs commonly into a mongoose database. This function is also used to map values for scale or data modifcations. 
     - `axios.post()` AppointmentForm component is a function that contains axios.post() which takes the values (`email, name, gender, age, description, time, day`) alias patorn's credentials to later defined the array by map(), This function is used to map values from one range to another, commonly used for scaling values.
  
  4. **Class Definitions:**
     - `Connect` class: This class encapsulates the main functionality of the graphical effect. It manages the dots, connections between them, and their behavior.
       - The constructor initializes various properties and settings related to the canvas, dots, and connection areas.
       - The `resize()` method updates canvas and element sizes based on the window dimensions.
       - `onMove()` and `onLeave()` methods handle mouse or touch movement and leave events, updating the destination coordinates of the connection area.
       - `connectDots()` method connects dots with lines based on certain conditions.
       - `update()` method orchestrates the animation loop, updating the dots and connections.
     - `Dot` class: This class defines the characteristics and behavior of individual dots.
       - The constructor initializes the properties of a dot, including its position, velocity, radius, and color.
       - `draw()` method draws the dot on the canvas.
       - `update()` method updates the position of the dot based on its velocity and ensures it bounces off canvas boundaries.
  
  5. **Canvas Setup and Interaction:**
     - The code selects the canvas element and gets its 2D rendering context (`ctx`).
     - An instance of the `Connect` class is created (`connect`), which manages the graphical effect.
     - Event handlers are defined to handle mouse and touch interactions.
     - A window resize event listener triggers the `resize()` method of the `Connect` instance.
  
  6. **Animation Loop:**
     - The code defines a self-invoking function that serves as the animation loop using `requestAnimationFrame()`.
     - Inside the loop, the `update()` method of the `Connect` instance is called to update the graphical effect.

