## **Intro**

Welcome to my portfolio site! My goal with this design is to showcase my skills and projects in a way that feels modern, professional, and engaging. To achieve this, I have drawn inspiration from the endless possibilities of technology and the ever-evolving design trends in the industry.

## **Design**

The design of this portfolio site is focused on creating a clean and intuitive user interface that highlights my projects and experience. The color scheme is a combination of dark blues and light yellow, which creates a sense of universe throughout the site.
Layout is designed to be responsive and adaptable, ensuring that the site looks great on any device or screen size.

## Tech stacks

1. Vite: A local development server written by Evan You and used by default by the Vue project templates. It has support for TypeScript and JSX.
2. Three.js: A cross-browser JavaScript library and application programming interface used to create and display animated 3D computer graphics in a web browser using WebGL.

## Three.js

Three.js is a JavaScript library used to create and display animated 3D computer graphics in a web browser. This guide will cover how to create a camera, scene, and render using Three.js, as well as how to set the pixel ratio, use the **`getBoundingClientRect()`** method, and create a torus.

### Create Camera, Scene, render

> *To actually be able to display anything with three.js, we need three things: scene, camera and renderer, so that we can render the scene with camera. - [Three.js docs](https://threejs.org/docs/index.html#manual/en/introduction/Creating-a-scene)*
> 

```jsx
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
```

### Pixel Ratio

```jsx
renderer.setPixelRatio(window.devicePixelRatio);
```

> *.[setPixelRatio](https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer.setPixelRatio) ( value : number ) : undefined*
> 
> 
> *Sets device pixel ratio. This is usually used for HiDPI device to prevent blurring output canvas.*
> 

**`renderer.setPixelRatio(window.devicePixelRatio)`** is a line of code that sets the pixel ratio of the WebGL renderer to match the device's pixel density.

The **`renderer`** in this case is an instance of the **`WebGLRenderer`** class from the Three.js library, which is used to render 3D graphics in a browser. The **`setPixelRatio`** method is a function that sets the pixel ratio of the renderer.

The **`window.devicePixelRatio`** is a property that returns the ratio of the physical pixels in the device's display to the logical pixels used by the browser. For example, if a device has a physical resolution of 1920x1080 pixels and a device pixel ratio of 2.0, then the device would have a logical resolution of 960x540 pixels.

By setting the pixel ratio of the renderer to match the device's pixel density, the rendered graphics can look sharper and more detailed on high-density displays.

<aside>
💡 If you don't set the pixel ratio of the renderer to match the device's pixel density, then the rendered graphics may appear blurry or pixelated on high-density displays.

When the pixel ratio of the renderer doesn't match the device's pixel density, the renderer will render the scene at a lower resolution than the device's display resolution. Then, the browser will upscale the rendered graphics to fill the screen, which can result in blurry or pixelated graphics.

Setting the pixel ratio of the renderer to match the device's pixel density ensures that the renderer will render the scene at the correct resolution for the device's display, resulting in sharper and more detailed graphics.

</aside>

### getBoundingClentRect()

```jsx
function moveCamera() {
		const t = document.body.getBoundingClientRect().top;
		...
		...
}
```

1. The **`getBoundingClientRect().top`** method returns the distance between the top edge of the element and the top edge of the viewport. This distance is a measurement of the element's position relative to the top of the viewport.
2. Note that the **`getBoundingClientRect()`** method returns an object with several properties, such as **`left`**, **`right`**, **`bottom`**, and **`width`**. You can use these properties to get information about the element's position and size relative to the viewport.

### [MDN: Element.getBoundingClientRect()](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)

> *The **`Element.getBoundingClientRect()`** method returns a `[DOMRect](https://developer.mozilla.org/en-US/docs/Web/API/DOMRect)` object providing information about the size of an element and its position relative to the [viewport](https://developer.mozilla.org/en-US/docs/Glossary/Viewport).*
[*Return value*](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect#return_value)
*The returned value is a `[DOMRect](https://developer.mozilla.org/en-US/docs/Web/API/DOMRect)` object which is the smallest rectangle which contains the entire element, including its padding and border-width. The `left`, `top`, `right`, `bottom`, `x`, `y`, `width`, and `height` properties describe the position and size of the overall rectangle in pixels. Properties other than `width` and `height` are relative to the top-left of the viewport.*
> 
![Untitled](https://user-images.githubusercontent.com/39251171/236612192-91731134-be3e-42e0-864d-25ce564079e1.png)
```jsx
document.body.onscroll = moveCamera;
moveCamera();
```

1. The code **`document.body.onscroll = moveCamera;`** assigns the **`moveCamera`** function to the **`onscroll`** event of the **`document.body`** element. This means that when the user scrolls the page, the **`moveCamera`** function will be called.
2. The code **`moveCamera();`** calls the **`moveCamera`** function immediately after it's assigned to the **`onscroll`** event. This may be useful if you want to initialize some values or perform some actions on page load, before the user has a chance to scroll.

## Create Torus

```jsx
const geometry = new THREE.TorusGeometry(14.155, 1.485, 30, 96);
const material = new THREE.MeshStandardMaterial({ color: 0xdeb887 });
const torus = new THREE.Mesh(geometry, material);
```

> *Three.js docs [TorusGeometry example](https://threejs.org/docs/index.html?q=torus#api/en/geometries/TorusGeometry)*
> 

## Clipboard function

```jsx
document.getElementById("copy-text-btn").onclick = function () {
  navigator.clipboard
    .writeText(document.getElementById("copy-text").innerText)
    .then(function () {
      alert("Email has been copied!");
    });
};
```

1. **`document.getElementById("copy-text-btn")`** code retrieves the button element from the document's DOM using its ID.
2. **`.onclick`** property assigns an event handler function to the button's onclick event.
3. The function defined as the event handler executes when the button is clicked.
4. **`navigator.clipboard.writeText()`** method writes the text content of the element with an ID of "copy-text" to the clipboard.
5. If the write operation succeeds, the **`.then()`** method executes the function that displays an alert message to the user.

<aside>
💡 object.onclick = function(){myScript}; & **object.addEventListener("click", myScript);**

Both **`object.onclick`** and **`object.addEventListener("click", myScript)`** are used to assign a function to execute when an element is clicked, but there are some key differences between the two.

Here are some of the differences between the two methods:

1. **Multiple event handlers:** One of the primary differences between **`onclick`** and **`addEventListener`** is that **`addEventListener`** allows multiple event handlers to be attached to the same element and event type, while **`onclick`** can only have one function attached at a time. This means that **`addEventListener`** provides more flexibility when working with event handling.
2. **Event capturing/bubbling:** Another key difference is that **`addEventListener`** provides the ability to specify whether the event handler should be triggered during the "capturing" or "bubbling" phase of the event propagation. The capturing phase occurs before the event reaches the target element, while the bubbling phase occurs after the event has been handled by the target element and propagates up the DOM tree. **`onclick`** does not provide this level of control over the event handling process.
3. **Compatibility:** Finally, there are some differences in the level of compatibility between the two methods. **`onclick`** is an older method that has been supported by browsers for a long time, while **`addEventListener`** is a newer method that may not be supported by older browsers. However, **`addEventListener`** is now widely supported by modern browsers, so this is becoming less of an issue.

In general, **`addEventListener`** is considered to be the more flexible and powerful method for handling events, while **`onclick`** is a simpler and more straightforward approach. If you need to attach multiple event handlers to an element, or if you need to control the event propagation behavior, **`addEventListener`** is probably the better choice. If you just need to attach a single event handler to an element and don't need to worry about these other factors, **`onclick`** is a perfectly viable option.

</aside>

## Transit .onclick into .AddEventListener
```// Get the copy button element by its ID
const copyBtn = document.getElementById("copy-text-btn");

// Add an event listener to the copy button that triggers the copyGmail function when clicked
copyBtn.addEventListener("click", copyGmail);

// The copyGmail function retrieves the email content and copies it to the clipboard
function copyGmail() {
  // Get the email content by its ID
  const copyGmail = document.getElementById("copy-text").innerText;

  // Use the navigator.clipboard API to copy the email content to the clipboard
  navigator.clipboard.writeText(copyGmail).then(() => {
    // Display an alert message to the user when the email has been successfully copied
    alert("Email has been copied!");
  });
}```
