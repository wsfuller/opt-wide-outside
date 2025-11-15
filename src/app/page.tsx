'use client';
import { HiOutlineRocketLaunch } from 'react-icons/hi2';
import {
  AppShell,
  Container,
  Grid,
  Text,
  Timeline,
  Title,
} from '@mantine/core';

import AppBar from '@/components/AppBar';
import HeroImage from '@/components/HeroImage';

export default function Home() {
  return (
    <AppShell>
      <AppShell.Header>
        <AppBar />
      </AppShell.Header>
      <AppShell.Main>
        <>
          <HeroImage />
          <Container>
            <Grid>
              <Grid.Col span={12}>
                <Title>Opt Wide Outside</Title>
              </Grid.Col>
              <Grid.Col span="auto">
                <Text mb="sm">
                  Excerpt here about the history of the league. Bacon ipsum
                  dolor amet do nisi jowl ut tongue buffalo. Incididunt id esse
                  proident veniam landjaeger tri-tip pork labore. Pariatur
                  corned beef sed venison minim ham laborum ut. Sint consectetur
                  reprehenderit tail fatback, elit prosciutto tempor sausage.
                  Pancetta meatloaf sausage, laborum shankle short loin in
                  deserunt biltong. Fatback bresaola et laborum prosciutto.
                </Text>

                <Text>
                  Excerpt here about the history of the league. Bacon ipsum
                  dolor amet do nisi jowl ut tongue buffalo. Incididunt id esse
                  proident veniam landjaeger tri-tip pork labore. Pariatur
                  corned beef sed venison minim ham laborum ut. Sint consectetur
                  reprehenderit tail fatback, elit prosciutto tempor sausage.
                  Pancetta meatloaf sausage, laborum shankle short loin in
                  deserunt biltong. Fatback bresaola et laborum prosciutto.
                </Text>
              </Grid.Col>
              <Grid.Col span={4}>
                <Timeline active={1} bulletSize={24} lineWidth={2}>
                  <Timeline.Item
                    bullet={<HiOutlineRocketLaunch />}
                    title="League Started"
                  >
                    <Text c="dimmed" size="sm">
                      10 person league is born
                    </Text>
                    <Text size="xs" mt={4}>
                      2018
                    </Text>
                  </Timeline.Item>

                  <Timeline.Item
                    title="First champion"
                    bullet={<HiOutlineRocketLaunch />}
                    lineVariant="dashed"
                  >
                    <Text c="dimmed" size="sm">
                      First place trophy name
                    </Text>
                    <Text size="xs" mt={4}>
                      2018
                    </Text>
                  </Timeline.Item>

                  <Timeline.Item
                    title="Toilet Bowl"
                    bullet={<HiOutlineRocketLaunch />}
                  >
                    <Text c="dimmed" size="sm">
                      The first ever Toilet Bowl game is played
                    </Text>
                    <Text size="xs" mt={4}>
                      2023
                    </Text>
                  </Timeline.Item>
                </Timeline>
              </Grid.Col>
            </Grid>
          </Container>
        </>
      </AppShell.Main>
    </AppShell>
  );
}
