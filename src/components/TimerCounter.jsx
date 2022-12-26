import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function TimerCounter({ isActive }) {
    const [second, setSecond] = useState(0)
    const [minute, setMinute] = useState(0)
    useEffect(() => {
        let idTimer
        if (isActive) {
            idTimer = setTimeout(() => {
                if (second < 60) {
                    setSecond(second => second + 1)
                } else {
                    setSecond(0)
                    setMinute(minute => minute + 1)
                }
            }, 1000)
        } else {
            clearTimeout(idTimer)
        }
        return () => clearTimeout(idTimer)
    }, [second, minute, isActive])
    return (
        <span>
            {minute < 10 && '0'}
            {minute}:{second < 10 && '0'}
            {second}
        </span>
    )
}

export default TimerCounter
