import React from 'react';

const Blogs = () => {
    return (
        <div>
            <h2 class=" w-full text-3xl mt-5 font-extrabold">
                    Frequently-Five questions here
                </h2>
            
                <div className='grid mt-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 px-5'>
                    <div tabindex="0" class="collapse collapse-plus border border-base-300 bg-base-100 rounded-box">
                    <input type="checkbox" /> 
                        <div class="collapse-title text-xl font-medium">
                        How will you improve the performance of a React Application?
                        </div>
                        <div class="collapse-content text-left"> 
                            <p>In React applications, we are guaranteed a very fast UI by default. However, as an application grows, developers may encounter some performance issues.
                                In this guide, we will discuss five important ways to optimize 
                                the performance of a React application, including pre-optimization techniques.</p>
                        </div>
                    </div>
                    <div tabindex="0" class="collapse collapse-plus border border-base-300 bg-base-100 rounded-box">
                    <input type="checkbox" /> 
                        <div class="collapse-title text-xl font-medium">
                        What are the different ways to manage a state in a React application?
                        </div>
                        <div class="collapse-content text-left"> 
                            <p>When we talk about state in our applications, it’s important to be clear about what types of state actually matter.
                                There are four main types of state you need to properly manage in your React apps:<br/>
                                1. Local state.<br/>
                                2. Global state.<br/>
                                3. Server state.<br/>
                                4. URL state.<br/>
                            </p>
                        </div>
                    </div>
                    <div tabindex="0" class="collapse collapse-plus border border-base-300 bg-base-100 rounded-box">
                    <input type="checkbox" /> 
                        <div class="collapse-title text-xl font-medium">
                        How does prototypical inheritance work?
                        </div>
                        <div class="collapse-content text-left"> 
                            <p>The Prototypal Inheritance is a feature in javascript
                                used to add methods and properties in objects.
                                It is a method by which an object can inherit the
                                properties and methods of another object.</p>
                        </div>
                    </div>
                    <div tabindex="0" class="collapse collapse-plus border border-base-300 bg-base-100 rounded-box">
                    <input type="checkbox" /> 
                        <div class="collapse-title text-xl font-medium">
                        Why you do not set the state directly in React.
                        </div>
                        <div class="collapse-content text-left"> 
                            <p>React provides a method called setState for this purpose.
                                setState() enqueues changes to the component state and tells
                                React that this component and its children need to be re-rendered
                                with the updated state.</p>
                        </div>
                    </div>
                    <div tabindex="0" class="collapse collapse-plus border border-base-300 bg-base-100 rounded-box">
                    <input type="checkbox" /> 
                        <div class="collapse-title text-xl font-medium">
                        How will you implement a search to find products by name?
                        </div>
                        <div class="collapse-content"> 
                            <p>You have an array of products. Each product has a name, price, description, etc
                            Firstly, we import useState from react . 
                            Then, we import the Scroll and SearchList components.
                            Next, in the Search function, we use the useState hook to 
                            initialise the value of the searchField state with useState("") 
                            (an empty string). After this, we use the filter function on the details
                            list received from the parent.
                            </p>
                        </div>
                    </div>
                    <div tabindex="0" class="collapse collapse-plus border border-base-300 bg-base-100 rounded-box">
                    <input type="checkbox" /> 
                        <div class="collapse-title text-xl font-medium">
                        What is a unit test? Why should write unit tests?
                        </div>
                        <div class="collapse-content"> 
                            <p>Unit tests are typically automated tests written and run by software developers to ensure that a section of an application (known as the "unit") meets its design and behaves as intended. In procedural programming, a unit could be an entire module, but it is more commonly an individual function or procedure.</p>
                        </div>
                    </div>
                </div>
                

        </div>
    );
};

export default Blogs;