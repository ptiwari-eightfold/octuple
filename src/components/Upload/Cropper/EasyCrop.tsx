import React, {
  useState,
  useCallback,
  useRef,
  useImperativeHandle,
  forwardRef,
  memo,
} from 'react';
import { default as EasyCropper } from 'react-easy-crop';
import type { Area, Point, Size } from 'react-easy-crop/types';
import {
  EasyCropHandle,
  EasyCropProps,
  INIT_ZOOM,
  ZOOM_STEP,
  INIT_ROTATE,
  ROTATE_STEP,
  MIN_ROTATE,
  MAX_ROTATE,
} from './Cropper.types';
import { Slider } from '../../Slider';
import { Stack } from '../../Stack';
import { SystemUIButton, ButtonShape, ButtonSize } from '../../Button';
import { IconName } from '../../Icon';

import styles from './cropper.module.scss';

const EasyCrop = forwardRef<EasyCropHandle, EasyCropProps>((props, ref) => {
  const {
    aspect,
    cropperProps,
    cropperRef,
    grid,
    image,
    maxZoom,
    minZoom,
    rotate,
    rotateLeftButtonAriaLabelText,
    rotateRightButtonAriaLabelText,
    shape,
    zoom,
    zoomInButtonAriaLabelText,
    zoomOutButtonAriaLabelText,
  } = props;

  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [cropSize, setCropSize] = useState<Size>({ width: 0, height: 0 });
  const [zoomVal, setZoomVal] = useState<number>(INIT_ZOOM);
  const [rotateVal, setRotateVal] = useState<number>(INIT_ROTATE);
  const cropPixelsRef: React.MutableRefObject<Area> = useRef<Area>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const onMediaLoaded = useCallback(
    (mediaSize): void => {
      const { height, width } = mediaSize;
      const ratioWidth: number = height * aspect;

      if (width > ratioWidth) {
        setCropSize({ width: ratioWidth, height });
      } else {
        setCropSize({ width, height: width / aspect });
      }
    },
    [aspect]
  );

  const onCropComplete = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area): void => {
      cropPixelsRef.current = croppedAreaPixels;
    },
    []
  );

  useImperativeHandle(
    ref,
    () => ({
      rotateVal,
      setZoomVal,
      setRotateVal,
      cropPixelsRef,
    }),
    [rotateVal]
  );

  return (
    <>
      <EasyCropper
        {...cropperProps}
        ref={cropperRef}
        aspect={aspect}
        classes={{
          containerClassName: styles.cropperContainer,
          mediaClassName: 'cropper-media',
        }}
        crop={crop}
        cropShape={shape}
        cropSize={cropSize}
        image={image}
        maxZoom={maxZoom}
        minZoom={minZoom}
        onCropChange={setCrop}
        onCropComplete={onCropComplete}
        onMediaLoaded={onMediaLoaded}
        onRotationChange={setRotateVal}
        onZoomChange={setZoomVal}
        rotation={rotateVal}
        showGrid={grid}
        zoom={zoomVal}
        zoomWithScroll={zoom}
      />
      {zoom && (
        <section className={styles.cropperZoomControl}>
          <Stack direction={'horizontal'} fullWidth gap={'s'}>
            <SystemUIButton
              ariaLabel={zoomOutButtonAriaLabelText}
              classNames={styles.cropperIconButton}
              disabled={zoomVal - ZOOM_STEP < minZoom}
              iconProps={{
                path: IconName.mdiMinus,
              }}
              onClick={() => setZoomVal(zoomVal - ZOOM_STEP)}
              shape={ButtonShape.Round}
              size={ButtonSize.Small}
            />
            <Slider
              containerClassNames={styles.cropperSlider}
              max={maxZoom}
              min={minZoom}
              onChange={(value: number | number[]) => setZoomVal(Number(value))}
              hideMax
              hideMin
              step={ZOOM_STEP}
              value={zoomVal}
            />
            <SystemUIButton
              ariaLabel={zoomInButtonAriaLabelText}
              classNames={styles.cropperIconButton}
              disabled={zoomVal + ZOOM_STEP > maxZoom}
              iconProps={{
                path: IconName.mdiPlus,
              }}
              onClick={() => setZoomVal(zoomVal + ZOOM_STEP)}
              shape={ButtonShape.Round}
              size={ButtonSize.Small}
            />
          </Stack>
        </section>
      )}
      {rotate && (
        <section className={styles.cropperRotateControl}>
          <Stack direction={'horizontal'} fullWidth gap={'s'}>
            <SystemUIButton
              ariaLabel={rotateLeftButtonAriaLabelText}
              classNames={styles.cropperIconButton}
              disabled={rotateVal === MIN_ROTATE}
              iconProps={{
                path: IconName.mdiRotateLeft,
              }}
              onClick={() => setRotateVal(rotateVal - ROTATE_STEP)}
              shape={ButtonShape.Round}
              size={ButtonSize.Small}
            />
            <Slider
              containerClassNames={styles.cropperSlider}
              max={MAX_ROTATE}
              min={MIN_ROTATE}
              onChange={(value: number | number[]) =>
                setRotateVal(Number(value))
              }
              hideMax
              hideMin
              step={ROTATE_STEP}
              value={rotateVal}
            />
            <SystemUIButton
              ariaLabel={rotateRightButtonAriaLabelText}
              classNames={styles.cropperIconButton}
              disabled={rotateVal === MAX_ROTATE}
              iconProps={{
                path: IconName.mdiRotateRight,
              }}
              onClick={() => setRotateVal(rotateVal + ROTATE_STEP)}
              shape={ButtonShape.Round}
              size={ButtonSize.Small}
            />
          </Stack>
        </section>
      )}
    </>
  );
});

export default memo(EasyCrop);
