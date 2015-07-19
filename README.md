# loadable
A tiny library for setting up multiple AJAX loading animations

Creating a loading animation is at its core always the same thing. This library helps you to set everything up for an entire group of AJAX triggers at once, whether it be buttons, links or anything clickable (other events coming soon).

- High flexibility
- Non-invasive to DOM
- Prevents accidental multiple submits
- Triggered automatically in <form> sent with ENTER
- Understands form validation and pulls back if invalid
- Supports all modern browsers

How it works:

For loading animation within the trigger, a `.loading` class is added during the AJAX call:

`$('button').loadable();`

Want a different classname? No problem.

`$('button').loadable({toggleClass: 'myclass'});`

You can change the button that way with CSS according to your needs (a sample is provided in jquery.loadable.css)

For a custom loading animation with a separate container (CSS anims, different positions, etc.):

`$('button').loadable({position: ‘parent’, containerClass: ‘customload’, content: 'A huge hug while you wait…’}});`

// note that trigger still gets loading class, if toggleClass isn't null

It's really that simple. Now you can finally focus on handling the calls right instead of adding animations all the time.
