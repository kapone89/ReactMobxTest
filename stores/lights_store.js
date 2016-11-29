import lodash from "lodash"
import { fetch } from "fetch";
import { observable } from "mobx"
import { stringify } from 'query-string';
import Light from "../models/light"


class LightsStore {
  @observable lights = [];
  @observable isWorking = false;

  async reload() {
    try {
      this.isWorking = true
      var response = await fetch('http://172.20.0.29:8080/lights')
      var responseJson = await response.json()
      this.lights = responseJson.map((light) => {
        return new Light({id: light.id, description: light.description, state: light.state})
      })
      this.isWorking = false
    } catch (e) {
      this.isWorking = false
      console.log(e);
    }
  }

  async turnOffAll() {
    try {
      await fetch('http://172.20.0.29:8080/turn_off')
    } catch (e) {
      console.log(e);
    }
  }

  async turnOnCommon() {
    try {
      var common = [23, 8, 6, 5, 24, 25, 9, 4, 10];
      await this.reload()
      var turnedOff = lodash.reject(this.lights, "state")
      for (let light of turnedOff) {
        if (lodash.includes(common, light.id)) {
          await fetch('http://172.20.0.29:8080/toggle/' + light.id)
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}

const lightsStore = new LightsStore();
export default lightsStore
