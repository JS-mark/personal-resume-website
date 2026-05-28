import { resume } from '@resume/data'
import { Composition } from 'remotion'
import { CareerTimeline } from './compositions/CareerTimeline/CareerTimeline'
import { careerTimelineDefaults, careerTimelineSchema } from './compositions/CareerTimeline/schema'
import { ContactCard } from './compositions/ContactCard/ContactCard'
import { contactCardDefaults, contactCardSchema } from './compositions/ContactCard/schema'
import { HeroIntro } from './compositions/HeroIntro/HeroIntro'
import { heroIntroDefaults, heroIntroSchema } from './compositions/HeroIntro/schema'
import { ProjectShowcase } from './compositions/ProjectShowcase/ProjectShowcase'
import { projectShowcaseDefaults, projectShowcaseSchema } from './compositions/ProjectShowcase/schema'
import { skillsShowcaseDefaults, skillsShowcaseSchema } from './compositions/SkillsShowcase/schema'
import { SkillsShowcase } from './compositions/SkillsShowcase/SkillsShowcase'

const W = 1920
const H = 1080
const FPS = 30

export function RemotionRoot() {
  return (
    <>
      <Composition
        id="HeroIntro"
        component={HeroIntro}
        durationInFrames={300}
        fps={FPS}
        width={W}
        height={H}
        schema={heroIntroSchema}
        defaultProps={{
          ...heroIntroDefaults,
          name: resume.basics.name,
          taglines: resume.basics.taglines ?? heroIntroDefaults.taglines,
        }}
      />
      <Composition
        id="SkillsShowcase"
        component={SkillsShowcase}
        durationInFrames={450}
        fps={FPS}
        width={W}
        height={H}
        schema={skillsShowcaseSchema}
        defaultProps={{
          ...skillsShowcaseDefaults,
          skills: resume.skills,
        }}
      />
      <Composition
        id="ProjectShowcase"
        component={ProjectShowcase}
        durationInFrames={600}
        fps={FPS}
        width={W}
        height={H}
        schema={projectShowcaseSchema}
        defaultProps={{
          ...projectShowcaseDefaults,
          project: resume.projects[0]!,
        }}
      />
      <Composition
        id="CareerTimeline"
        component={CareerTimeline}
        durationInFrames={540}
        fps={FPS}
        width={W}
        height={H}
        schema={careerTimelineSchema}
        defaultProps={{
          ...careerTimelineDefaults,
          work: resume.work,
        }}
      />
      <Composition
        id="ContactCard"
        component={ContactCard}
        durationInFrames={210}
        fps={FPS}
        width={W}
        height={H}
        schema={contactCardSchema}
        defaultProps={{
          ...contactCardDefaults,
          basics: resume.basics,
          qrPayload: resume.basics.url ?? '',
        }}
      />
    </>
  )
}
