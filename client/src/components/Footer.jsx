import React from 'react';
import { Footer, FooterLinkGroup, FooterTitle } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';

export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='mt-5'>
            <Link to="/" className="mt-5 self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white">
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Hiruka's</span> Blog
            </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <FooterTitle title='About' />
              <FooterLinkGroup col>
                <a 
                  href='https://www.100jsprojects.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className="text-blue-500 hover:text-blue-600"
                >
                  100 JS Projects
                </a>
                <a 
                  href='https://www.100jsprojects.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className="text-blue-500 hover:text-blue-600"
                >
                  Hiruka's Blog
                </a>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title='Follow Us' />
              <FooterLinkGroup col>
                <a 
                  href='https://www.github.com/HirukaWarnakula'
                  target='_blank'
                  rel='noopener noreferrer'
                  className="text-blue-500 hover:text-blue-600 mb-2"
                >
                  GitHub
                </a>
                <a 
                  href='#'
                  className="text-blue-500 hover:text-blue-600"
                >
                  Discord
                </a>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title='Legal' />
              <FooterLinkGroup col>
                <a 
                  href='#'
                  className="text-blue-500 hover:text-blue-600"
                >
                  Privacy Policy
                </a>
                <a 
                  href='#'
                  className="text-blue-500 hover:text-blue-600"
                >
                  Terms & Conditions
                </a>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright href='#' by="Hiruka's Blog" year={new Date().getFullYear()} />
          <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
            <Footer.Icon href='#' icon={BsFacebook} />
            <Footer.Icon href='#' icon={BsInstagram} />
            <Footer.Icon href='#' icon={BsTwitter} />
            <Footer.Icon href='https://github.com/HirukaWarnakula' icon={BsGithub} />
            <Footer.Icon href='#' icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
