import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import { createProfile, getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handle: "",
      name: "",
      age: "",
      location: "",
      lookingFor: "",
      bio: "",
      artists: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // If profile field doesnt exist, make empty string
      profile.name = !isEmpty(profile.name) ? profile.name : "";
      profile.age = !isEmpty(profile.age) ? profile.age : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.lookingFor = !isEmpty(profile.lookingFor)
        ? profile.lookingFor
        : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.artists = !isEmpty(profile.artists) ? profile.artists : "";

      // Set component fields state
      this.setState({
        handle: profile.handle,
        name: profile.name,
        age: profile.age,
        location: profile.location,
        lookingFor: profile.lookingFor,
        bio: profile.bio,
        artists: profile.artists
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      name: this.state.name,
      age: this.state.age,
      location: this.state.location,
      lookingFor: this.state.lookingFor,
      bio: this.state.bio,
      artists: this.state.artists
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    // Select options for status
    const options = [
      { label: "* Select Option", value: 0 },
      { label: "Male seeking Female", value: "Male seeking Female" },
      { label: "Female seeking Male", value: "Female seeking Male" },
      { label: "Male seeking Male", value: "Male seeking Male" },
      { label: "Female seeking Female", value: "Female seeking Female" },
      { label: "Seeking new friends", value: "Seeking new friends" },
      { label: "Not sure", value: "Not sure" }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Username"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                />
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="Age"
                  name="age"
                  value={this.state.age}
                  onChange={this.onChange}
                  error={errors.age}
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                />
                <SelectListGroup
                  placeholder="Seeking..."
                  name="looking for"
                  value={this.state.lookingFor}
                  onChange={this.onChange}
                  options={options}
                  error={errors.lookingFor}
                />
                <TextAreaFieldGroup
                  placeholder="Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                />
                <TextFieldGroup
                  placeholder="Artists I like...."
                  name="artists"
                  value={this.state.artists}
                  onChange={this.onChange}
                  error={errors.artists}
                />

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-warning btn-lg mt-4 ml-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(CreateProfile));
