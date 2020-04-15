import React, {Component, Fragment} from "react";
import PropTypes from "prop-types";

const Instruction = {
    SLEEP: -2,
    BACKSPACE: -1,
};

class Typewriter extends Component {
    static propTypes = {
        loop: PropTypes.bool,
        clear: PropTypes.bool,
        cursor: PropTypes.oneOf(["show", "blink", null]),
        prefix: PropTypes.string,
        suffix: PropTypes.string,
        word: PropTypes.string,
        words: PropTypes.arrayOf(PropTypes.string),
        typeSleep: PropTypes.number,
        clearSleep: PropTypes.number,
        cursorBlinkSleep: PropTypes.number,
    };
    static defaultProps = {
        loop: false,
        clear: false,
        cursor: null,
        prefix: "",
        suffix: "",
        word: "",
        words: [],
        typeSleep: 50,
        clearSleep: 2000,
        cursorBlinkSleep: 400,
    };

    constructor(props) {
        super(props);
        const {word, words} = this.props;
        this.instructions = [];
        if (word) {
            this.compile(word);
        }
        if (words) {
            for (let i = 0; i < words.length; ++i) {
                this.compile(words[i])
            }
        }
        this.state = {
            text: "",
            cursorVisible: true,
            instructionPtr: 0,
        }
    }

    componentDidMount() {
        this.startExec();
    }

    componentWillUnmount() {
        this.stopExec();
        clearTimeout(this.instructionSleepTimer);
    }

    startExec() {
        const {typeSleep} = this.props;
        this.typeTimer = setInterval(this.typeTick.bind(this), typeSleep);
    }

    stopExec() {
        clearInterval(this.typeTimer);
    }

    startBlinking() {
        const {cursorBlinkSleep} = this.props;
        this.blinkTimer = setInterval(this.cursorTick.bind(this), cursorBlinkSleep);
    }

    stopBlinking() {
        clearInterval(this.blinkTimer);
        this.setState({cursorVisible: true});
    }

    pauseExec() {
        const {cursor} = this.props;
        this.stopExec();
        if (cursor === "blink") {
            this.startBlinking();
        }
    }

    resumeExec() {
        const {cursor} = this.props;
        this.startExec();
        if (cursor === "blink") {
            this.stopBlinking();
        }
    }

    cursorTick() {
        this.setState(({cursorVisible}) => ({cursorVisible: !cursorVisible}));
    }

    typeTick() {
        const {loop} = this.props;
        this.setState(({text, instructionPtr}) => {
            const update = {};
            switch (this.instructions[instructionPtr]) {
                case Instruction.SLEEP:
                    this.pauseExec();
                    ++instructionPtr;
                    this.instructionSleepTimer = setTimeout(this.resumeExec.bind(this), this.instructions[instructionPtr]);
                    break;
                case Instruction.BACKSPACE:
                    update.text = text.slice(0, -1);
                    break;
                default:
                    update.text = text + this.instructions[instructionPtr];
            }
            if (loop) {
                update.instructionPtr = (instructionPtr + 1) % this.instructions.length;
            } else {
                if (instructionPtr !== this.instructions.length - 1) {
                    update.instructionPtr = instructionPtr + 1;
                } else {
                    this.stopExec();
                }
            }
            return update;
        });
    }

    render() {
        const {prefix, suffix, cursor} = this.props;
        const {text, cursorVisible} = this.state;
        return (
            <Fragment>
                <Fragment>{prefix}</Fragment>
                <Fragment>{text}</Fragment>
                {
                    cursor ? <span style={{visibility: cursorVisible ? "visible" : "hidden"}}>|</span> : null
                }
                <Fragment>{suffix}</Fragment>
            </Fragment>
        );
    }


    compile(word) {
        const {clearSleep, clear} = this.props;
        for (let i = 0; i < word.length; ++i) {
            this.instructions.push(word[i]);
        }
        if (clearSleep) {
            this.instructions.push(Instruction.SLEEP);
            this.instructions.push(clearSleep);
        }
        if (clear) {
            for (let i = 0; i < word.length; ++i) {
                this.instructions.push(Instruction.BACKSPACE);
            }
        }
    }
}


export default Typewriter;