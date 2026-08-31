import React from 'react'
import Intro from './intro/page'
import AboutPage from './about/page'
import ProjectsPage from './projects/page'
import ServicesPage from './services/page'
import ContactPage from './contact/page'
import SkillPage from './skill/page'

export default function Home() {
  return (
    <div>
      <Intro/>
      <AboutPage/>
      <SkillPage/>
      <ProjectsPage/>
      <ServicesPage/>
      <ContactPage/>
      
    </div>
  )
}
