import { motion } from 'framer-motion';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import { dehydrate, QueryClient, useQuery } from 'react-query';
import styled from 'styled-components';
import { fetchTeams } from '../../hooks/api/useTeams';
import { ITeam } from '../../store/Types';
import { breakpoints } from '../../styles/media';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  ${breakpoints.large} {
    width: 128rem;
  }
  ${breakpoints.medium} {
    width: 68rem;
  }
  ${breakpoints.small} {
    width: 35rem;
  }
`;

const SubTitle = styled.h2`
  font-family: 'RobotoMonoRegular';
  color: #b70000;
  ${breakpoints.large} {
    font-size: 1.4rem;
    line-height: 1.846rem;
    padding-top: 16.7rem;
    padding-bottom: 21.2rem;
  }
  ${breakpoints.medium} {
    font-size: 1.4rem;
    line-height: 1.846rem;
    padding-top: 16.7rem;
    padding-bottom: 21.2rem;
  }
  ${breakpoints.small} {
    font-size: 1.1rem;
    line-height: 1.846rem;
    padding-top: 8.7rem;
    padding-bottom: 2.2rem;
  }
`;

const GridContainer = styled.div`
  display: grid;
  ${breakpoints.large} {
    grid-template-columns: repeat(5, 1fr);
    height: 39.8rem;
    column-gap: 4.9rem;
    row-gap: 10.8rem;
  }
  ${breakpoints.medium} {
    grid-template-columns: repeat(5, 1fr);
    height: 39.8rem;
    column-gap: 4.9rem;
    row-gap: 10.8rem;
  }
  ${breakpoints.small} {
    grid-template-columns: repeat(2, 1fr);
    height: 39.8rem;
    column-gap: 2.9rem;
    row-gap: 3.8rem;
  }
`;

const TeamCard = styled(motion.div)<ITeam & { clicked: boolean }>`
  cursor: grab;
  background-size: contain;
  background-repeat: no-repeat;
  ${(props) =>
    props.clicked
      ? `background-image: url(${props.colourLogo});`
      : `background-image: url(${props.blackLogo});`}
  background-position: center;
  ${breakpoints.large} {
    width: 21.7rem;
    height: 14.5rem;
  }
  ${breakpoints.medium} {
    width: 15.7rem;
    height: 14.5rem;
  }
  ${breakpoints.small} {
    width: 15.7rem;
    height: 6.5rem;
  }
`;

const NextButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 117rem;
  padding-top: 16rem;
`;

const NextButtonText = styled.h3`
  font-family: 'RobotoMonoRegular';
  font-size: 2.2rem;
  line-height: 2.9rem;
  color: #b70000;
`;

const ArrowImg = styled.img`
  ${breakpoints.large} {
    margin-top: -0.6rem;
    width: 10.35rem;
    height: auto;
  }
  ${breakpoints.medium} {
    margin-top: -0.6rem;
    width: 10.35rem;
    height: auto;
  }
  ${breakpoints.small} {
    margin-top: -0.6rem;
    width: 6rem;
    height: auto;
  }
`;

const cardVariants = {
  unHovered: {
    scale: 1,
  },
  hovered: {
    scale: 1.1,
  },
};

export default function Custom() {
  const { data } = useQuery('teamData', () => fetchTeams());
  // if (isLoading) return <div>Loading</div>;
  // if (error) return 'An error has occurred: ' + error?.message;
  const teams = data?.teamDTOList;
  const [selectedName, setSelectedName] = React.useState<string[]>([]);

  return (
    <Wrapper>
      <SubTitle>BB:PSP(Baseball: Player Stats P rediction)</SubTitle>
      <GridContainer>
        {teams?.map((team: ITeam) => {
          const isClicked = selectedName.includes(team.name);
          return (
            <TeamCard
              variants={cardVariants}
              initial="unHovered"
              whileHover="hovered"
              onClick={() => {
                if (selectedName.includes(team.name)) {
                  setSelectedName(selectedName.filter((v) => v !== team.name));
                } else {
                  setSelectedName((prev) => [...prev, team.name]);
                }
              }}
              clicked={isClicked}
              key={team.name}
              name={team.name}
              colourLogo={team.colourLogo}
              blackLogo={team.blackLogo}
            />
          );
        })}
      </GridContainer>
      <NextButtonContainer>
        <Link href="/">
          <NextButtonText>
            next
            <ArrowImg src="image/arrow.png" />
          </NextButtonText>
        </Link>
      </NextButtonContainer>
    </Wrapper>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery('teamData', () => fetchTeams());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
