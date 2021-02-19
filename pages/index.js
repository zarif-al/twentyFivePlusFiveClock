import Head from "next/head";
import styles from "../styles/Home.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useEffect, useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowCircleUp,
  faArrowCircleDown,
  faPlayCircle,
  faPauseCircle,
  faUndoAlt,
} from "@fortawesome/free-solid-svg-icons";
export default function Home() {
  const [inSession, setInSession] = useState(true);
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [clockOn, setClockOn] = useState(false);
  const [timeLeft, setTimeLeft] = useState(sessionLength * 60);
  const [timerColor, setTimerColor] = useState("white");
  const [pauseColor, setPauseColor] = useState(true);
  const changeTime = () => {
    if (timeLeft > 0) {
      setTimeLeft((timeLeft) => timeLeft - 1);
    }
    if (timeLeft <= 60) {
      setTimerColor("red");
    }
    if (timeLeft === 0) {
      setTimerColor("white");
      if (inSession) {
        setInSession(false);
        setTimeLeft(breakLength * 60);
        alarm();
      } else {
        setTimeLeft(sessionLength * 60);
        setInSession(true);
        alarm();
      }
    }
  };
  useEffect(() => {
    if (clockOn) {
      const interval = setInterval(changeTime, 1000);
      return () => clearInterval(interval);
    }
  });

  const hint = () => {
    let i = 0;
    var x = setInterval(() => {
      if (i % 2 === 0) {
        setPauseColor(false);
      } else {
        setPauseColor(true);
      }
      i = i + 1;
      if (i === 5) {
        clearInterval(x);
        setPauseColor(true);
      }
    }, 300);
  };

  const changeSession = (action) => {
    if (action === "increase") {
      if (sessionLength < 60 && !clockOn) {
        setTimerColor("white");
        setSessionLength((sessionTime) => sessionTime + 1);
        if (inSession) {
          setTimeLeft((sessionLength + 1) * 60);
        }
      } else if (clockOn) {
        hint();
      }
    } else {
      if (sessionLength > 1 && !clockOn) {
        setTimerColor("white");
        setSessionLength((sessionTime) => sessionTime - 1);
        if (inSession) {
          setTimeLeft((sessionLength - 1) * 60);
        }
      } else if (clockOn) {
        hint();
      }
    }
  };

  const changeBreak = (action) => {
    if (action === "increase") {
      if (breakLength < 60 && !clockOn) {
        setTimerColor("white");
        setBreakLength((breakTime) => breakTime + 1);
        if (!inSession) {
          setTimeLeft((breakLength + 1) * 60);
        }
      } else if (clockOn) {
        hint();
      }
    } else {
      if (breakLength > 1 && !clockOn) {
        setTimerColor("white");
        setBreakLength((breakTime) => breakTime - 1);
        if (!inSession) {
          setTimeLeft((breakLength - 1) * 60);
        }
      } else if (clockOn) {
        hint();
      }
    }
  };

  const alarm = () => {
    const sound = document.getElementById("beep");
    sound.play();
  };

  const startClock = () => {
    setClockOn(true);
  };
  const stopClock = () => {
    setClockOn(false);
  };
  const reset = () => {
    stopClock();
    setBreakLength(5);
    setSessionLength(25);
    setInSession(true);
    setTimerColor("white");
    setTimeLeft(25 * 60);
    const sound = document.getElementById("beep");
    sound.load();
  };
  const playPause = () => {
    if (!clockOn) {
      startClock();
    } else {
      stopClock();
    }
  };
  const convertToMMSS = () => {
    var minutes = Math.floor(timeLeft / 60);
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    var seconds = timeLeft - minutes * 60;
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return minutes + ":" + seconds;
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>25 + 5 Clock</title>
      </Head>
      <Container>
        <Row className="align-items-center" style={{ height: "100vh" }}>
          <Container>
            <Row
              className={
                styles.heading + " justify-content-center align-items-center"
              }
            >
              25 + 5 Clock
            </Row>
            <Row className=" justify-content-center align-items-center">
              <Col className={styles.controls}>
                <Row className="justify-content-center">
                  <h3 id="session-label">Session Length</h3>
                </Row>
                <Row noGutters={true}>
                  <Col className="text-right align-self-center" xs={5}>
                    <Button
                      variant="link"
                      onClick={() => changeSession("increase")}
                      className={styles.button}
                      id="session-increment"
                    >
                      {" "}
                      <FontAwesomeIcon
                        icon={faArrowCircleUp}
                        size="2x"
                        color="white"
                      />
                    </Button>
                  </Col>
                  <Col
                    className={styles.lengthFont + " text-center"}
                    xs={2}
                    id="session-length"
                  >
                    {sessionLength}
                  </Col>
                  <Col className="text-left align-self-center" xs={5}>
                    <Button
                      variant="link"
                      onClick={() => changeSession("decrease")}
                      className={styles.button}
                      id="session-decrement"
                    >
                      {" "}
                      <FontAwesomeIcon
                        icon={faArrowCircleDown}
                        size="2x"
                        color="white"
                      />
                    </Button>
                  </Col>
                </Row>
                <Row className="justify-content-center">
                  <h3 id="break-label">Break Length</h3>
                </Row>
                <Row noGutters={true}>
                  <Col className="text-right align-self-center" xs={5}>
                    <Button
                      variant="link"
                      onClick={() => changeBreak("increase")}
                      className={styles.button}
                      id="break-increment"
                    >
                      {" "}
                      <FontAwesomeIcon
                        icon={faArrowCircleUp}
                        size="2x"
                        color="white"
                      />
                    </Button>
                  </Col>
                  <Col
                    className={styles.lengthFont + " text-center"}
                    xs={2}
                    id="break-length"
                  >
                    {breakLength}
                  </Col>
                  <Col className="text-left align-self-center" xs={5}>
                    <Button
                      variant="link"
                      onClick={() => changeBreak("decrease")}
                      className={styles.button}
                      id="break-decrement"
                    >
                      {" "}
                      <FontAwesomeIcon
                        icon={faArrowCircleDown}
                        size="2x"
                        color="white"
                      />
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col className={styles.clock}>
                <Row
                  id="timer-label"
                  className={styles.timerLabel + " justify-content-center"}
                >
                  {inSession ? "SESSION" : "BREAK"}
                </Row>
                <Row
                  className={styles.timer + " justify-content-center"}
                  style={{ color: timerColor }}
                  id="time-left"
                >
                  {convertToMMSS(timeLeft)}
                </Row>
                <Row noGutters={true}>
                  <Col className="text-right">
                    <Button
                      variant="link"
                      onClick={playPause}
                      className={styles.button}
                      id="start_stop"
                    >
                      {!clockOn ? (
                        <FontAwesomeIcon
                          icon={faPlayCircle}
                          size="2x"
                          color="white"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faPauseCircle}
                          size="2x"
                          color={pauseColor ? "white" : "red"}
                        />
                      )}
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="link"
                      onClick={reset}
                      className={styles.button}
                      id="reset"
                    >
                      <FontAwesomeIcon
                        icon={faUndoAlt}
                        color="white"
                        size="2x"
                      />
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
      <audio
        id="beep"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
}
