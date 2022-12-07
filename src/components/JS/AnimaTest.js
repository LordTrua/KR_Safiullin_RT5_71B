import React, { useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { useSpring, animated, useSprings } from 'react-spring';
import '../styles/style.css';
import DbSegment from './DbSegment';
import Segment from './SLSegment';

function AnimaTest() {
  let pause = true;
  //Анимация фрагментов БД
  const dbSegments = [
    DbSegment('A'),
    DbSegment('B'),
    DbSegment('C'),
    DbSegment('D'),
  ];
  let startTime = new Date();
  let nowTime = new Date();
  const rSegmantFunc = () => {
    dbSegments.forEach((dbSegment, key) => {
      if (dbSegment.segmentDataCount <= 100) {
        let nowTime = new Date();
        const randLoad =
          dbSegment.segmentDataCount + parseInt(Math.random() * 100, 10);
        console.log(
          (nowTime - startTime) / 1000 +
            ' Штатно пришло нагрузки: ' +
            randLoad +
            ' на узел ' +
            dbSegment.segmentNumber
        );
        dbSegment.setSegmentDataCount(randLoad);
      }
    });
  };
  // R data кубики
  const rSegments = [
    Segment('r1', 'r1', 50, 0, 280, 0, true, 600, rSegmantFunc),
    Segment('r2', 'r2', 50, 0, 280, 0, true, 300, rSegmantFunc),
    Segment('r3', 'r3', 50, 0, 280, 0, true, 800, rSegmantFunc),
  ];
  //SL data кубики
  const sLSegments = [
    Segment('A', 'A', 80, 0, 300, 30, true, 234),
    Segment('B', 'B', 80, 0, 300, 30, true, 436),
    Segment('D', 'D', 80, 0, 300, 30, true, 700),
  ];
  let isStart = true;

  //Остановка и возобновление анимации
  const stopFunc = () => {
    if (isStart) {
      isStart = false;
      startTime = new Date();
    }
    if (!pause) {
      rSegments.forEach((rSegment, key) => {
        rSegment.apiSLData.start((index) => ({ pause: false }));
      });
      sLSegments.forEach((SLSegment, key) => {
        SLSegment.apiSLData.start((index) => ({ pause: false }));
      });
      dbSegments.forEach((dbSegment, key) => {
        dbSegment.apiDataSigment.start((index) => ({ pause: false }));
      });
    }
    if (pause) {
      rSegments.forEach((rSegment, key) => {
        rSegment.apiSLData.start((index) => ({ pause: true }));
      });
      sLSegments.forEach((SLSegment, key) => {
        SLSegment.apiSLData.start((index) => ({ pause: true }));
      });
      dbSegments.forEach((dbSegment, key) => {
        dbSegment.apiDataSigment.start((index) => ({ pause: true }));
      });
    }
    pause = !pause;
  };
  // количетсво нажатий кнопок crash

  const crashFunc = () => {
    // Тут надо будет санимировать краш системы
    // Сегменты БД скрываются
    dbSegments.forEach((dbSegment, key) => {
      if (dbSegment.segmentDataCount <= 150) {
        const load = parseInt(Math.random() * 100, 10);
        console.log(
          'Пришло ' + load + ' нагрузки на сегмент ' + dbSegment.segmentNumber
        );
        dbSegment.setSegmentDataCount(dbSegment.segmentDataCount + load);
      }
      if (dbSegment.segmentDataCount > 150 && !dbSegment.isFall) {
        dbSegment.isFall = true;
        //SL сегменты останавливаются
        sLSegments.forEach((SLSegment, keySL) => {
          if (key === keySL) {
            SLSegment.apiSLData.start((index) => ({
              from: { x: 80, y: 20 - Math.random() * 10 },
              to: { x: 100, y: 30 - Math.random() * 10 },
            }));
          }
        });
        // Скрываем крашнувшуюся БД
        dbSegment.apiDataSigment.start((index) => ({ opacity: 0 }));
        console.log(
          'Сегемент ' +
            dbSegment.segmentNumber +
            ' базы данных прекратил работу...'
        );
        //
        const dataCount = dbSegment.segmentDataCount;
        dbSegments.forEach((dbSegment, key1) => {
          if (!dbSegment.isFall) {
            // Получаем количество сегментов, которые ещё работают
            const dataDivider = dbSegments.filter(
              (dbSegment) => !dbSegment.isFall
            ).length;
            dbSegment.segmentDataCount =
              dbSegment.segmentDataCount +
              parseInt(
                dataCount / dataDivider / parseInt(Math.random() * 10, 10),
                10
              );
          }
        });
      }
    });
    //setSegmentCount(crashSegmentCount + 1);
  };

  // Возвразщает анимацию
  return (
    <>
      <div className="squares">
        <div className="Rcontainers container">
          <p>R container</p>
          {rSegments.map((rSegment, key) => {
            return (
              <animated.div
                style={{
                  margin: 20,
                  width: 80,
                  height: 80,
                  backgroundColor: 'rgb(50, 159, 213)',
                  borderRadius: 16,
                  ...rSegment.stylesSLData,
                }}
              >
                <br />R data
              </animated.div>
            );
          })}
        </div>
        <div className="serverContainer container">
          <p>Server Container</p>
          {sLSegments.map((SLSegment, key) => {
            return (
              <animated.div
                style={{
                  margin: 20,
                  width: 80,
                  height: 80,
                  backgroundColor: 'rgb(50, 159, 213)',
                  borderRadius: 16,
                  ...SLSegment.stylesSLData,
                }}
              >
                <br />
                S-N data
              </animated.div>
            );
          })}
        </div>
        <div className="dbcontainer container">
          {' '}
          <p>DB</p>
          {
            // Веруть сюда сегменты БД
            dbSegments.map((dbSegment) => {
              return (
                <animated.div style={{ ...dbSegment.styleDataSigment }}>
                  DB Segment {dbSegment.segmentNumber}
                  <br />
                  Нагрузка узла: {dbSegment.segmentDataCount}
                </animated.div>
              );
            })
          }
        </div>
      </div>
      <button onClick={stopFunc}>Play|Pause</button> <br /> <br />
      <button className="BIG_RED_BUTTON" onClick={crashFunc}>
        БОЛЬШАЯ КРАСНАЯ КНОПКА пользователя
      </button>{' '}
    </>
  );
}

export default AnimaTest;
