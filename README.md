# loadable

Creating a loading animation is at its core always the same thing. This library helps you to set everything up for an entire group of AJAX triggers at once, whether it be buttons, links or anything clickable (other events coming soon).

- High flexibility
- Non-invasive to DOM
- Prevents accidental multiple submits
- Triggered automatically in <form> sent with ENTER
- Understands form validation and pulls back if invalid
- Supports all modern browsers

##How it works

- For loading animation within the trigger, a `.loading` class is added during the AJAX call:

`$('button').loadable();`

- Want a different classname? No problem.

`$('button').loadable({toggleClass: 'myclass'});`

*You can change the button that way with CSS according to your needs (a sample is provided in jquery.loadable.css)*

- For a custom loading animation with a separate container (CSS anims, different positions, etc.):

`$('button').loadable({container: ‘customload’, content: 'A huge hug while you wait…’});`

It's really that simple. Now you can finally focus on handling the calls right instead of adding animations all the time.

##Options

### toggleClass
trigger's class while loading

**Default**: 'loading'

### flagClass 
a class name for the internal mechanism

**Default**: 'loadable'

### container
a class name for the custom container if needed

**Default**: false

### position
position relative to the trigger

**Default**: 'parent' (parent || this (only with paired tags))

Notes:
> - Has no effect if container isn't set

> - Please, don't use the 'this' option on non-paired tags

### content
content for the custom container

**Default**: null,

### validate
form validation, `f` points to the form

**Default**: function (f) {...}


Note:
> By default, this plugin supports jQuery Validate and HTML5 validation. 

## Methods

### refresh
Refreshes custom containers when DOM changed

### destroy
Destroys the object

##Copyright

Released under the MIT License.

