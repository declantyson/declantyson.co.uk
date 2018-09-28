# npm is Killing JavaScript

###### More overhead, more typing, more packages, more bloat, more dependencies and more bullshit

#### 28th September 2018

Over the past few days at work I have gone on a couple of expletive-ridden rants about the state of the front-end development ecosystem in the modern age. I've decided - mostly for my own catharsis - to try and pencil down some more reasonable words about my issues with the industry as a whole, and limiting the f-bombs to when absolutely necessary.

First off, fuck npm.

npm is both a blessing and a curse. Having a package manager is amazing and - especially when it comes to the infrastructure side of things like build tools and development servers - it speeds up the tricky parts of development to a huge degree. It's also probably responsible at least in part to the increased uptake of JS on the whole over the past few years, which in turn has led to some incredible improvements in the language as a whole. I genuinely like JavaScript, especially in its ES6+ specification, even with its typing irregularities which don't cause any issues 99% of the time. But npm has been abused to hell and back by developers themselves.

Now you'd think, after the great [left-pad fiasco of 2016](https://www.theregister.co.uk/2016/03/23/npm_left_pad_chaos/), that maybe packages and frameworks would stop relying so much on micro-packaging everything, but dependency hell continues. We recently started a project at work using Gatsby, the "latest and greatest" in quick-starting a React project in an environment where the latest and greatest changes on a weekly basis. Out of the box, this installed over 1300 packages. That is absolutely fucking insane. And I get that there's a lot going on in there - you get React, a Webpack config, GraphQL, but still - 1300 dependencies is a _lot_ of packages, and you can't convince me that every single one of those is worthwhile. 

Everyone has their own framework preferences and I'm not going to go into the "which framework is better" debate, but rather I'm going to dive into the React world as that's what I have the most experience with.

At a core level, I like React. I'm a big proponent of component-based development and the HTML spec is often insufficient, but I think XML syntax is very good for markup - which is why JSX speaks to me. But of course, it's not without its issues, and there's several attempts out there to fix them. One of the biggest issues is communicating state between components that aren't in a direct hierarchy. One of the most popular solutions to this is Redux.

Redux has good intentions, but fuck me, it is the definition of using a sledgehammer to crack a walnut. In fact, it bypasses the sledgehammer and goes straight for the nuclear option. The amount of writing you have to do to get any single thing to work in Redux is horrifying, and it also has an awfully steep learning curve with a bunch of _very_ abstract concepts that add layers of complexity for what honestly feels like the sake of complexity. It just seems to break the fundamental programming rule **don't repeat yourself**. But, when writing Redux, that's basically all you do, and it only gets worse when you include something like Observables to manage the events themselves. 

And then there's the quickstart kits. I already mentioned how Gatsby uses an obscene amount of packages, but it doesn't end there. Following the tutorials, it pushes GraphQL over REST. Now I'm not opposed to this, GraphQL is a significant improvement over REST, but in Gatsby, they've integrated their own implementation which adds yet _more_ concept abstractions such as "nodes" and "edges". This is, again, with good intentions, attempting to make page management simpler, but they've pushed these concepts across _all_ GraphQL requests that run through Gatsby, meaning that if I just want to get some JSON stored locally I still have to jump through nodes and edges instead of just getting to the damn things. Which leads me to my biggest anger point of it so far - in order to read JSON from a .json file using Gatsby, I need to install a transformer package to do so. It's already JavaScript - what the fuck are you transforming it to?!

Gatsby also encourages (but does not require) you to use yet another package to start routing image requests through GraphQL. Now, displaying images in HTML is a problem that has been solved for over 20 years. But apparently, we have to now route images through GraphQL and a preprocessor to make them more "performant" and "optimised". This, frankly, is absurd. I do not believe for a second that adding even more JavaScript to an already JS-heavy application is going to save even close to enough data to be worth the extra hoops you have to jump through for this, unless you are already using incredibly poorly optimised images.

And then we get to my biggest pet peeve of all, which is styled-components. In my opinion, styled-components is attempting to solve a problem that doesn't exist. It's not like adding the styles into your component file is any more effort than using a Sass file - when working with components you should already be grouping your Sass files with your component source in the folder structure. So what's the complaint? Managing multiple files? Sure, let's just start throwing everything into massive files again, why not? I don't know when separation of concerns stopped being a thing in FE dev, but apparently it's not that important any more.  

You don't even get the nice syntax sugar that you get with other frameworks - it's just CSS. Except, instead of using sensible variables like you do in Sass, you have interpolate the string and then map from a theme which sits higher up in your project, which you wrapped in a special theme provider component, which takes its variables from a new theme class. Oh, and you do this every time you want to use a variable. Further to this, if you include a CSS framework (I personally like to avoid using them but many projects call for them) then specificity immediately becomes an issue, so you have to start adding CSS classes to your styled components anyway. Which, surely, defeats half of the point of styling components directly. And then just to rub salt into the wound, it provides _even more_ naming headaches.  

I feel like an apt comparison is if you imagine that frontend frameworks are like cakes. They make your application bloat, but the sugar provides you with some sweet benefits. With styled-components they forgot the sugar and added salt instead.

To illustrate my frustrations, let's take a very simple footer component, using React and Sass. The background of this footer has been set by our framework to be white, but we want it to be the brand primary colour.


```
    /* some_css_framework.scss */
    
    $brand-primary: cornflowerblue;
    .footer {
        background-color: #ffffff;
    }
```

```
    /* Footer.js */
   
    const Footer = ({ links }) => (
        <footer className="footer">
            {links.map(link => <Link href={link} />)}
        </footer>
    );

```

```
   /* footer.scss */
   
   footer.footer {
        background-color: $brand-primary;
   }
```

Simple. And the same thing in styled-components:

```
    /* theme.js */
    export default {
      brandPrimary: 'cornflowerblue', // this is fine, I don't have a problem with this
    }

    /* Footer.js */
   
    // We need to give this component another name, because Footer is already taken
    const FooterContainer = styled.footer` // this syntax is ugly
        &.footer { // here we lose what is surely the main benefit of styled-components almost immediately
            background-color: ${props => props.themes.brandPrimary}; // this is just CSS but less clear
        }
    `;
   
    const Footer = ({ links }) => (
        <ThemeProvider theme={theme}>
            <FooterContainer className="footer"> {/* And we still need to add the class name, because otherwise it'll be overridden by the CSS framework */}
                {links.map(link => <Link href={link} />)}
            </FooterContainer>
        </ThemeProvider>
    );

```

With styled components we just add more overhead, more typing, more JavaScript, more packages, more bloat, more dependencies and more bullshit. 

At the end of all this it just makes me question the overall state of the discipline. I'd estimate that around 75% of the packages on npm either attempt to solve problems that don't exist, or they just feed into the worrying modern paradigm of lazy development. Out of the remaining, a lot of them over-complicate tasks that you could probably achieve in a third of the time and a tenth of the code overhead in just plain markup and vanilla JavaScript. It seems to be a misguided attempt to weed out "bad" developers by making things far more complex than they need to be.

On top of this, this obsession with making our development into a unified process is stifling creativity in design and UX. In attempting to make JS a respected language amongst our developer peers, we have effectively killed what made it so great in the first place:

> JavaScript is a scripting language.
 
JS allows us to extend HTML+CSS and make it better. It's not supposed to replace it. 

I recently read an article echoing similar sentiments, but then criticised it for not really offering any solutions. So, attempting not to fall foul of my own criticisms, I have a task for every (if any) front-end developer who reads this: spend half a day working on a new UI flow. It doesn't have to be particularly user-friendly, nor even anything innovative, just something that you personally haven't done before. It doesn't even have to be good. It's just an experiment. The one caveat: don't use npm. Don't use React, Angular, or any other front-end framework. Don't even use jQuery. Use JavaScript, the way it is, and connect with the language itself instead of the bullshit that surrounds it.