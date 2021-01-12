import React, { useState } from 'react';
import styles from '../../styles/builder.module.css';
import { Game } from '../../classes/GameFunctions';
import BuilderBlock from '../BuilderBlock';



function Builder() {

    const layout = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
    ];
    var game = new Game(layout);

    const handleDragStart = e => {
        e.target.classList.add(styles.is_being_dragged);
        e.dataTransfer.setData('text/plain', e.target.id);
        e.dataTransfer.dropEffect = 'move';
    }

    const handleDragEnter = e => {
        e.preventDefault();
        e.target.classList.add('is_active_drop_zone');
    };

    const handleDragLeave = e => {
        e.target.classList.remove('is_active_drop_zone');

    };

    const handleDragOver = e => {
        e.preventDefault();
    };

    const handleDrop = e => {
        const column = e.target.id[7];
        const row = e.target.id[8];
        const blockId = game.blocks.length;
        game.buildBlock(row, column, blockId);
        // updateBoard();

        // const id = e.dataTransfer.getData('text/plain');
        // const draggedElement = document.getElementById(id);
        // const carId = draggedElement.id;


        // draggedElement.draggable = false;
        // draggedElement.classList.remove(styles.is_being_dragged);
        // e.target.appendChild(draggedElement);
    };

    const priBlk = "https://i.imgur.com/n07UANE.png";
    const horSBlk = "https://i.imgur.com/EuehW2s.png";
    const horLBlk = "https://i.imgur.com/TLYg7Bv.png";
    const vertSBlk = "https://i.imgur.com/CJswBXz.png";
    const vertLBlk = "https://i.imgur.com/bzFg8KO.png";

    const updateBoard = () => {
        game.blocks.forEach(block => {
            const imageElement = document.getElementById(`image-${block.id}`);
            // const negativeMoveElement = document.getElementById(`negativeMove-${block.id}`);
            // const positiveMoveElement = document.getElementById(`positiveMove-${block.id}`);

            if (block.orientation === 'v') {
                // negativeMoveElement.style.backgroundImage = `url(${upArrow})`;
                // positiveMoveElement.style.backgroundImage = `url(${downArrow})`;
                // negativeMoveElement.style.backgroundPosition = 'top';
                // positiveMoveElement.style.backgroundPosition = 'bottom';
                if (block.length === 2) imageElement.style.backgroundImage = `url(${vertSBlk})`;
                else imageElement.style.backgroundImage = `url(${vertLBlk})`;
            } else {
                // negativeMoveElement.style.backgroundImage = `url(${leftArrow})`;
                // positiveMoveElement.style.backgroundImage = `url(${rightArrow})`;
                // negativeMoveElement.style.backgroundPosition = 'left';
                // positiveMoveElement.style.backgroundPosition = 'right';
                if (block.length === 2) {
                    if (block.row === 2) imageElement.style.backgroundImage = `url(${priBlk})`;
                    else imageElement.style.backgroundImage = `url(${horSBlk})`;
                } else imageElement.style.backgroundImage = `url(${horLBlk})`;
            }
        })
    }

    const setBoard = () => {
        const carOne = document.getElementById('car-one');
        const carTwo = document.getElementById('car-two');
        const carThree = document.getElementById('car-three');
        const carFour = document.getElementById('car-four');
        const carFive = document.getElementById('car-five');
        carOne.style.backgroundImage = `url(${priBlk})`;
        carTwo.style.backgroundImage = `url(${horSBlk})`;
        carThree.style.backgroundImage = `url(${horLBlk})`;
        carFour.style.backgroundImage = `url(${vertSBlk})`;
        carFive.style.backgroundImage = `url(${vertLBlk})`;



        const carOneElement = document.getElementById('car-one');
        carOneElement.addEventListener('dragstart', handleDragStart);
        carOneElement.addEventListener('drop', handleDrop);

        const carTwoElement = document.getElementById('car-two');
        carTwoElement.addEventListener('dragstart', handleDragStart);

        const carThreeElement = document.getElementById('car-three');
        carThreeElement.addEventListener('dragstart', handleDragStart);

        const carFourElement = document.getElementById('car-four');
        carFourElement.addEventListener('dragstart', handleDragStart);

        const carFiveElement = document.getElementById('car-five');
        carFiveElement.addEventListener('dragstart', handleDragStart);


        const dropZones = document.getElementsByClassName(styles.drop_zone);
        Array.from(dropZones).forEach(function (dropZone) {
            dropZone.addEventListener('drop', handleDrop);
            dropZone.addEventListener('dragenter', handleDragEnter);
            dropZone.addEventListener('dragleave', handleDragLeave);
            dropZone.addEventListener('dragover', handleDragOver);
        });



        // for (element of draggableElements) { 
        //     element.addEventListener('dragstart', handleDragStart);
        // }
        // console.log(draggableElements);
        // .addEventListener('dragstart', handleDragStart);
    };

    setTimeout(setBoard, 0);


    return (
        <>
            <div className={styles.board_wrapper}>
                <div className={styles.column_one}>
                    <div className={styles.car} draggable="true" id='car-one'></div>
                    <div className={styles.car} draggable="true" id='car-two'></div>
                    <div className={styles.car} draggable="true" id='car-three'></div>
                    <div className={styles.car} draggable="true" id='car-four'></div>
                    <div className={styles.car} draggable="true" id='car-five'></div>
                </div>
                <div className={styles.column_two}>
                        {game.blocks.map((block, i) => {
                            return (
                                <BuilderBlock block={block} game={game} key={`block-${i + 1}`} />
                            )
                        })}
                    <div className={styles.board_container}>
                        <div className={styles.row}>
                            <div id="square-05" className={styles.drop_zone}></div>
                            <div id="square-15" className={styles.drop_zone}></div>
                            <div id="square-25" className={styles.drop_zone}></div>
                            <div id="square-35" className={styles.drop_zone}></div>
                            <div id="square-45" className={styles.drop_zone}></div>
                            <div id="square-55" className={styles.drop_zone}></div>
                        </div>
                        <div className={styles.row}>
                            <div id="square-04" className={styles.drop_zone}></div>
                            <div id="square-14" className={styles.drop_zone}></div>
                            <div id="square-24" className={styles.drop_zone}></div>
                            <div id="square-34" className={styles.drop_zone}></div>
                            <div id="square-44" className={styles.drop_zone}></div>
                            <div id="square-54" className={styles.drop_zone}></div>
                        </div>
                        <div className={styles.row}>
                            <div id="square-03" className={styles.drop_zone}></div>
                            <div id="square-13" className={styles.drop_zone}></div>
                            <div id="square-23" className={styles.drop_zone}></div>
                            <div id="square-33" className={styles.drop_zone}></div>
                            <div id="square-43" className={styles.drop_zone}></div>
                            <div id="square-53" className={styles.drop_zone}></div>
                        </div>
                        <div className={styles.row}>
                            <div id="square-02" className={styles.drop_zone}></div>
                            <div id="square-12" className={styles.drop_zone}></div>
                            <div id="square-22" className={styles.drop_zone}></div>
                            <div id="square-32" className={styles.drop_zone}></div>
                            <div id="square-42" className={styles.drop_zone}></div>
                            <div id="square-52" className={styles.drop_zone}></div>
                        </div>
                        <div className={styles.row}>
                            <div id="square-01" className={styles.drop_zone}></div>
                            <div id="square-11" className={styles.drop_zone}></div>
                            <div id="square-21" className={styles.drop_zone}></div>
                            <div id="square-31" className={styles.drop_zone}></div>
                            <div id="square-41" className={styles.drop_zone}></div>
                            <div id="square-51" className={styles.drop_zone}></div>
                        </div>
                        <div className={styles.row}>
                            <div id="square-00" className={styles.drop_zone}></div>
                            <div id="square-10" className={styles.drop_zone}></div>
                            <div id="square-20" className={styles.drop_zone}></div>
                            <div id="square-30" className={styles.drop_zone}></div>
                            <div id="square-40" className={styles.drop_zone}></div>
                            <div id="square-50" className={styles.drop_zone}></div>
                        </div>
                    </div>
                </div>
                <div className={styles.column_three}></div>
            </div>
        </>
    );
}
export default Builder;

{/* <div className={styles.row}>
                            <div id="square-05" className={styles.drop_zone}></div>
                            <div id="square-15" className={styles.drop_zone}></div>
                            <div id="square-25" className={styles.drop_zone}></div>
                            <div id="square-35" className={styles.drop_zone}></div>
                            <div id="square-45" className={styles.drop_zone}></div>
                            <div id="square-55" className={styles.drop_zone}></div>
                        </div>
                        <div className={styles.row}>
                            <div id="square-04" className={styles.drop_zone}></div>
                            <div id="square-14" className={styles.drop_zone}></div>
                            <div id="square-24" className={styles.drop_zone}></div>
                            <div id="square-34" className={styles.drop_zone}></div>
                            <div id="square-44" className={styles.drop_zone}></div>
                            <div id="square-54" className={styles.drop_zone}></div>
                        </div>
                        <div className={styles.row}>
                            <div id="square-03" className={styles.drop_zone}></div>
                            <div id="square-13" className={styles.drop_zone}></div>
                            <div id="square-23" className={styles.drop_zone}></div>
                            <div id="square-33" className={styles.drop_zone}></div>
                            <div id="square-43" className={styles.drop_zone}></div>
                            <div id="square-53" className={styles.drop_zone}></div>
                        </div>
                        <div className={styles.row}>
                            <div id="square-02" className={styles.drop_zone}></div>
                            <div id="square-12" className={styles.drop_zone}></div>
                            <div id="square-22" className={styles.drop_zone}></div>
                            <div id="square-32" className={styles.drop_zone}></div>
                            <div id="square-42" className={styles.drop_zone}></div>
                            <div id="square-52" className={styles.drop_zone}></div>
                        </div>
                        <div className={styles.row}>
                            <div id="square-01" className={styles.drop_zone}></div>
                            <div id="square-11" className={styles.drop_zone}></div>
                            <div id="square-21" className={styles.drop_zone}></div>
                            <div id="square-31" className={styles.drop_zone}></div>
                            <div id="square-41" className={styles.drop_zone}></div>
                            <div id="square-51" className={styles.drop_zone}></div>
                        </div>
                        <div className={styles.row}>
                            <div id="square-00" className={styles.drop_zone}></div>
                            <div id="square-10" className={styles.drop_zone}></div>
                            <div id="square-20" className={styles.drop_zone}></div>
                            <div id="square-30" className={styles.drop_zone}></div>
                            <div id="square-40" className={styles.drop_zone}></div>
                            <div id="square-50" className={styles.drop_zone}></div>
                        </div> */}