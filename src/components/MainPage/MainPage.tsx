import React from 'react';
import './MainPage.css';

// It's main page with description of me and short descripton of this project

const myCoverLetter : string = `I started programming at the Polytechnic. 
My first language was Python and C++. When I started learning C++ I discovered my passion to programming. 
I can program in C++, C#, Java Script, Type Script and I know the basics of SQL and Python. 
At the beginning programming in C++ turned out to be the most interesting for me.  
I have been learning this language for 2 years from books such as Opus Magnum C ++ by Jerzy Grebosz or The C ++ Programming Language by Bjarne Stroustrup and others. 
After a while I started to learn C # and I liked its full objectivity.
I learned C++ from online courses, however, it was the books and practice that gave me the most knowledge.
I have a good understanding of object oriented programming and memory management.
Currently, I am mainly interested in web programming and for a long time I have been learning React and developing my projects in it.
I also know other languages ​​needed in web programming, i.e. HTML and CSS.
I practice my algorithmic skills solving tasks on codewars.com, which is a form of entertainment for me. 
`;

const myProject : string = `This is calories calculator. Using it, you can calculate your caloric needs. 
On the Create Diet page you will see what the proportions of nutritional values ​​should be depending on the diet.
You will be redirected to this page after pressing the "Create Diet" button on the "Calories Calculator" page.
I created this project using Type Script and React. 
`

export const MainPage: React.FC = () => {
  return (
    <div className="main-page">
      <h1>About Me</h1>
      <text>
        {myCoverLetter}
      </text>
      <h1>About This Project</h1>
      <text>
        {myProject}
      </text>
    </div>
  );
}

