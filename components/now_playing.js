import React, { Component } from 'react';
import { View } from "react-native"
import { observer } from "mobx-react/native"
import NativeBase, { Button, Title, Spinner, Grid, Col, Card, CardItem, Text, Icon } from 'native-base';
import { Range, H1, H4 } from 'carbon-native';
import { Item, ItemIcon, ItemContent, ItemText, Note, List } from "carbon-native"
import IosTabs from "./ios_tabs";
import nowPlayingStore from "../stores/now_playing_store"
import streamsStore from "../stores/streams_store"
import router from "../stores/router"
import icon from '../services/icon'

@observer
export default class NowPlaying extends Component {
    componentDidMount() { nowPlayingStore.reload() }

    changeVolumeDelayed(newVolume) {
      clearTimeout(this.volumeChangeTimeout);
      this.volumeChangeTimeout = setTimeout(() => {
        nowPlayingStore.changeVolume(parseInt(newVolume * 10) * 10);
      }, 1000);
    }

    render() {
        return (
          <NativeBase.Container theme={this.props.theme}>
              <NativeBase.Header>
                  <Button transparent onPress={() => { router.back() }}>
                      <Icon name={icon('arrow-back')} />
                  </Button>

                  <Title>Now playing</Title>

                  <Button transparent onPress={() => { router.go("/streams_search") }}>
                      <Icon name={icon('search')} />
                  </Button>
              </NativeBase.Header>

              <NativeBase.Content>
                <Card>
                    {
                      nowPlayingStore.isWorking && <View>
                        <CardItem header>
                            <Text>Reloading...</Text>
                        </CardItem>

                        <CardItem>
                            <Spinner color="#f95346"/>
                        </CardItem>
                      </View>
                    }

                    {
                      !nowPlayingStore.isWorking && <View>
                        <CardItem header>
                            <Text>Stream info</Text>
                        </CardItem>

                        <CardItem>
                            <H1>{nowPlayingStore.nowPlayingName}</H1>
                            <Text>{nowPlayingStore.nowPlayingUrl}</Text>
                        </CardItem>

                        <CardItem header>
                            <Text>Volume</Text>
                        </CardItem>

                        <CardItem>
                            <Range
                              onValueChange={(v) => this.changeVolumeDelayed(v)}
                              value={nowPlayingStore.volume / 100}
                            />
                        </CardItem>
                      </View>
                    }

                    <View>
                      <CardItem header>
                          <Text>Predefined streams</Text>
                      </CardItem>

                      <List>
                        {
                          streamsStore.predefined.map((stream) => {
                            return (
                              <Item key={stream.id} onPress={() => { stream.play() }}>
                                <ItemIcon>
                                  <Icon name={icon('play')}/>
                                </ItemIcon>
                                <ItemContent>
                                  <ItemText>{stream.name}</ItemText>
                                  <Note>{stream.genre}</Note>
                                </ItemContent>
                              </Item>
                            )
                          })
                        }
                      </List>
                    </View>
               </Card>
              </NativeBase.Content>

              <NativeBase.Footer >
                 <IosTabs/>
             </NativeBase.Footer>
          </NativeBase.Container>
        );
    }
}
