import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import aboutImg from '../assets/hero-bcg.jpeg'

const AboutPage = () => {
  return (
    <main>
      <PageHero obj={{title:'About',bool:false}} />
      <Wrapper className="page section section-center">
        <img src={aboutImg} />
        <article>
          <div className="title">
            <h2>Our story</h2>
            <div className="underline"></div>
            <p>
              I have never known a Jack that was in good enough shape to name
              bodybuilding after himIf you work for an ad agency and getting
              paid for it aren't you the one who is being influenced by
              advertising?I started a sensory deprivation chamber business - it
              involves really dark curtains, ear plugs, and a sleeping mask
            </p>
          </div>
        </article>
      </Wrapper>
    </main>
  );
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage
