import React from 'react'

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
        <div className='flex-1 justify-center flex-col'>
            <h2 className='text-2xl'>
                want to learn  more about javascript?
            </h2>
            <p>
                checkout theae resources with 100 javascript projects
            </p>
            <Button gradientDuoTone='purpleToPink' className="rounded-tl-xl rounded-bl-none">
                <a href ="https://www.100jsprojects.com" target='_blank'
                rel='noopener noreferrer'>
                         100 Javascript Projects
                </a>
            </Button>


        </div>
        <div className="p-7 flex-1">
        <img src="https://www.google.com/imgres?q=javascript&imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F9%2F99%2FUnofficial_JavaScript_logo_2.svg%2F1200px-Unofficial_JavaScript_logo_2.svg.png&imgrefurl=https%3A%2F%2Fsimple.wikipedia.org%2Fwiki%2FJavaScript&docid=0LxdHiOIFqO5iM&tbnid=xJB_tNCymTHzpM&vet=12ahUKEwjl57-zrIqIAxV62jgGHWSaPGwQM3oECGcQAA..i&w=1200&h=1200&hcb=2&ved=2ahUKEwjl57-zrIqIAxV62jgGHWSaPGwQM3oECGcQAA"/>

        </div>
       
    </div>
  )
}
