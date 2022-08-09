/* eslint-disable */
import React, { Component } from "react";
import OvVideoComponent from "./OvVideo";
import "./index.css";

import { IconButton } from "@mui/material";

import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

export default class StreamComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: this.props.user.getNickname(),
      mutedSound: false,
    };
    this.toggleSound = this.toggleSound.bind(this);
  }

  toggleSound() {
    this.setState({ mutedSound: !this.state.mutedSound });
  }

  render() {
    return (
      <div className="OT_widget-container">
        <div className="nickname">
          <div>
            <span id="nickname">{this.props.user.getNickname()}</span>
          </div>
        </div>

        {this.props.user !== undefined &&
        this.props.user.getStreamManager() !== undefined ? (
          <div className="streamComponent">
            <OvVideoComponent
              user={this.props.user}
              mutedSound={this.state.mutedSound}
            />

            <div>
              {!this.props.user.isLocal() && (
                <IconButton id="volumeButton" onClick={this.toggleSound}>
                  {this.state.mutedSound ? (
                    <VolumeOffIcon color="secondary" />
                  ) : (
                    <VolumeUpIcon />
                  )}
                </IconButton>
              )}
            </div>

            <div id="statusIcons">
              {!this.props.user.isVideoActive() ? (
                <div id="camIcon">
                  <VideocamOffIcon id="statusCam" />
                </div>
              ) : null}

              {!this.props.user.isAudioActive() ? (
                <div id="micIcon">
                  <MicOffIcon id="statusMic" />
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}