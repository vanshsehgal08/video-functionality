import React from 'react';
import { Leaf, Github, Twitter, Linkedin } from 'lucide-react';
import FooterSection from './FooterSection';
import SocialLinks from './SocialLinks';
import { FOOTER_QUICK_LINKS, FOOTER_RESOURCES } from '../../../src/constants/navigation';

export default function Footer() {
  return (
    <footer className="bg-green-800 dark:bg-green-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-6 w-6" />
              <span className="font-bold text-lg">GreenQuest</span>
            </div>
            <p className="text-green-100 dark:text-green-200">
              Embark on your journey to environmental mastery.
            </p>
          </div>
          
          <FooterSection
            title="Quick Links"
            links={FOOTER_QUICK_LINKS}
          />
          
          <FooterSection
            title="Resources"
            links={FOOTER_RESOURCES}
          />
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect</h3>
            <SocialLinks />
          </div>
        </div>
        
        <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-100">
          <p>&copy; {new Date().getFullYear()} GreenQuest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}