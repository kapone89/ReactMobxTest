import React, { Component } from 'react';
import { observer } from "mobx-react/native"
import NativeBase, { Title, Icon, InputGroup, Input, Button, Grid, Col } from 'native-base';
import { TouchableHighlight } from "react-native"
import { Item, ItemIcon, ItemContent, ItemText, Note, List } from "carbon-native"
import IosTabs from "./ios_tabs";

export default class StreamsSearch extends Component {
    render() {
        return (
          <NativeBase.Container>
              <NativeBase.Header>
                  <Button transparent>
                      <Icon name='ios-arrow-back' />
                  </Button>

                  <Title>StreamsSearch</Title>
              </NativeBase.Header>

              <NativeBase.Content>
                <List>
                  {
                    [1, 2, 3, 4, 5].map((x) => {
                      return (
                        <Item key={x} onPress={() => {}}>
                          <ItemIcon>
                            <Icon name="ios-play"/>
                          </ItemIcon>
                          <ItemContent>
                            <ItemText>Radio {x}</ItemText>
                            <Note>R&B</Note>
                          </ItemContent>
                        </Item>
                      )
                    })
                  }
                </List>
              </NativeBase.Content>

              <NativeBase.Footer >
                 <IosTabs/>
             </NativeBase.Footer>
            </NativeBase.Container>
        );
    }
}