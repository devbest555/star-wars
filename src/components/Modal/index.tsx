import React from 'react'
import styled, { css } from 'styled-components'
import { animated, useTransition, useSpring } from 'react-spring'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import { isMobile } from 'react-device-detect'
import { transparentize } from 'polished'
import { useGesture } from 'react-use-gesture'

const AnimatedDialogOverlay = animated(DialogOverlay)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledDialogOverlay = styled(AnimatedDialogOverlay)`
  &[data-reach-dialog-overlay] {
    width: 100%;
    z-index: 2;
    overflow: hidden;
    position: fixed;
    top: calc(50vh - 250px);    
    display: flex;
    align-items: center;
    justify-content: center;

    background-color: transparent;
    color: #ffffff
  }
`

const AnimatedDialogContent = animated(DialogContent)
// destructure to not pass custom props to Dialog DOM element
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledDialogContent = styled(({ minHeight, maxHeight, mobile, isOpen, ...rest }) => (
  <AnimatedDialogContent {...rest} />
)).attrs({
  'aria-label': 'dialog',
})`
  overflow-y: ${({ mobile }) => (mobile ? 'scroll' : 'hidden')};

  &[data-reach-dialog-content] {
    margin: 0 0 2rem 0;
    background-color: #191B1F;
    border: 1px solid #212429;
    box-shadow: 0 4px 8px 0 ${() => transparentize(0.95, '#000')};
    padding: 0px;
    width: 50vw;
    overflow-y: ${({ mobile }) => (mobile ? 'scroll' : 'hidden')};
    overflow-x: hidden;

    align-self: ${({ mobile }) => (mobile ? 'flex-end' : 'center')};

    max-width: 420px;
    ${({ maxHeight }) =>
      maxHeight &&
      css`
        max-height: ${maxHeight}vh;
      `}
    ${({ minHeight }) =>
      minHeight &&
      css`
        min-height: ${minHeight}vh;
      `}
    display: flex;
    border-radius: 20px;

    @media screen and (max-width: 590px) {
      width: 90% !important;
    }
    @media screen and (max-width: 980px) {
      width: 90% !important;
    }
  }
`

interface ModalProps {
  isOpen: boolean
  onDismiss: () => void
  minHeight?: number | false
  maxHeight?: number
  initialFocusRef?: React.RefObject<any>
  children?: React.ReactNode
}

export default function Modal({
  isOpen,
  onDismiss,
  minHeight = false,
  maxHeight = 90,
  initialFocusRef,
  children,
}: ModalProps) {
  const fadeTransition = useTransition(isOpen, null, {
    config: { duration: 200 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const [{ y }, set] = useSpring(() => ({ y: 0, config: { mass: 1, tension: 210, friction: 20 } }))
  const bind = useGesture({
    onDrag: (state) => {
      set({
        y: state.down ? state.movement[1] : 0,
      })
      if (state.movement[1] > 300 || (state.velocity > 3 && state.direction[1] > 0)) {
        onDismiss()
      }
    },
  })

  return (
    <>
      {fadeTransition.map(
        ({ item, key, props }) =>
          item && (
            <StyledDialogOverlay
              key={key}
              style={props}
              onDismiss={onDismiss}
              initialFocusRef={initialFocusRef}
              unstable_lockFocusAcrossFrames={false}
            >
              <StyledDialogContent
                {...(isMobile
                  ? {
                      ...bind(),
                      style: { transform: y.interpolate((y) => `translateY(${(y as number) > 0 ? y : 0}px)`) },
                    }
                  : {})}
                aria-label="dialog content"
                minHeight={minHeight}
                maxHeight={maxHeight}
                mobile={isMobile}
              >
                {/* prevents the automatic focusing of inputs on mobile by the reach dialog */}
                {!initialFocusRef && isMobile ? <div tabIndex={1} /> : null}
                {children}
              </StyledDialogContent>
            </StyledDialogOverlay>
          )
      )}
    </>
  )
}
