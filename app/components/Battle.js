import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PlayerPreview from './PlayerPreview';

class PlayerInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        var value = event.target.value;

        this.setState({
            username: value
        });
    }
    handleSubmit(event) {
        event.preventDefault();

        this.props.onSubmit(this.props.id, this.state.username);
    }
    render() {
        const { username } = this.state;
        const { label } = this.props;
        return (
            <form className="column" onSubmit={this.handleSubmit}>
                <label className="header" htmlFor="username">
                    {label}
                </label>
                <input
                    id="username"
                    placeholder="github username"
                    type="text"
                    value={username}
                    autoComplete="off"
                    onChange={this.handleChange}
                />
                <button className="button" type="submit" disabled={!username}>
                    Submit
                </button>
            </form>
        );
    }
}

PlayerInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
};

PlayerInput.defaultProps = {
    label: 'Username'
};

class Battle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerOneName: '',
            playerTwoName: '',
            playerOneImage: null,
            playerTwoImage: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(id, username) {
        this.setState(() => {
            var newState = {};
            newState[id + 'Name'] = username;
            newState[id + 'Image'] =
                'https://github.com/' + username + '.png?size=200';
            return newState;
        });
    }
    handleReset(id) {
        this.setState(() => {
            var newState = {};
            newState[id + 'Name'] = '';
            newState[id + 'Image'] = null;
            return newState;
        });
    }
    render() {
        const { match } = this.props;
        const {
            playerOneName,
            playerOneImage,
            playerTwoName,
            playerTwoImage
        } = this.state;

        return (
            <div>
                <div className="row">
                    {!playerOneName && (
                        <PlayerInput
                            id="playerOne"
                            label="Player One"
                            onSubmit={this.handleSubmit}
                        />
                    )}

                    {playerOneImage !== null && (
                        <PlayerPreview
                            avatar={playerOneImage}
                            username={playerOneName}
                        >
                            <button
                                className="reset"
                                onClick={this.handleReset.bind(
                                    this,
                                    'playerOne'
                                )}
                            >
                                Reset
                            </button>
                        </PlayerPreview>
                    )}

                    {!playerTwoName && (
                        <PlayerInput
                            id="playerTwo"
                            label="Player Two"
                            onSubmit={this.handleSubmit}
                        />
                    )}

                    {playerTwoImage !== null && (
                        <PlayerPreview
                            avatar={playerTwoImage}
                            username={playerTwoName}
                        >
                            <button
                                className="reset"
                                onClick={this.handleReset.bind(
                                    this,
                                    'playerTwo'
                                )}
                            >
                                Reset
                            </button>
                        </PlayerPreview>
                    )}
                </div>

                {playerOneImage && playerTwoImage && (
                    <Link
                        className="button"
                        to={{
                            pathname: match.url + '/results',
                            search:
                                '?playerOneName=' +
                                playerOneName +
                                '&playerTwoName=' +
                                playerTwoName
                        }}
                    >
                        Battle
                    </Link>
                )}
            </div>
        );
    }
}

export default Battle;
