# loadable

Creating a loading animation is at its core always the same thing. This library helps you set everything up for an entire group of AJAX triggers at once, whether it be buttons, links or anything clickable (other events coming soon).

##Features

- High flexibility
- Non-invasive to DOM
- Prevents accidental multiple submits
- Triggered automatically in forms sent with ENTER
- Understands form validation and pulls back if invalid
- Supports all modern browsers

##How it works

- For loading animation within the trigger, a `.loading` class is added during the AJAX call:

`$('button').loadable();`

- Want a different classname? No problem.

`$('button').loadable({toggleClass: 'myclass'});`

> You can change the loading button's behavior that way with CSS according to your needs (a sample is provided in jquery.loadable.css). Multiple instances require different toggleClasses to preserve configs, that's why the plugin automatically increments the desired toggleClass in case it isn't unique.

- For a custom loading animation with a separate container (CSS anims, different positions, etc.):

`$('button').loadable({container: ‘customload’, content: 'A huge hug while you wait…’});`

It's really that simple. Now you can finally focus on handling the calls right instead of adding animations all the time.

##Options

### toggleClass
the trigger's class to be set while loading

**Default**: 'loading'

### container
a class name for the custom container if needed

**Default**: false

### position
the custom loading container's position relative to the trigger

**Default**: 'parent' (parent || this (only with paired tags))

Note:
> - Has no effect if container isn't set

> - Please, don't use the 'this' option on unpaired tags

### content
content for the custom container

**Default**: null

### validate
form validation, `f` points to the form

**Default**: function (f) {...}


Note:
> By default, this plugin supports jQuery Validate and HTML5 validation. 

## Methods

### refresh
Refreshes custom containers and dynamic triggers

**Args:** Takes a jQuery object to know which dynamic container is to be refreshed

Note:
> Use refresh only on triggers with the same toggleClass.

### destroy
Destroys the object

##Copyright

Released under the [MIT License](http://opensource.org/licenses/MIT).

