import React from 'react';
import LoginForm from './components/LoginForm';
import Player from './components/Player';
import ChannelList from './components/ChannelList';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            channels: [],
        };
    }

    handleLogin = (credentials) => {
        // Perform authentication logic here
        // For demo, we assume authentication is successful
        this.setState({ isAuthenticated: true });
        // Load channels or perform other actions after login
    };

    handleChannelManagement = (channels) => {
        this.setState({ channels });
    };

    render() {
        const { isAuthenticated, channels } = this.state;

        return (
            <div>
                {!isAuthenticated ? (
                    <LoginForm onLogin={this.handleLogin} />
                ) : (
                    <div>
                        <ChannelList channels={channels} onManageChannels={this.handleChannelManagement} />
                        <Player channels={channels} />
                    </div>
                )}
            </div>
        );
    }
}

export default App;