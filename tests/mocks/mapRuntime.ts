import { vi } from 'vitest'

type CameraMethod = (options?: Record<string, unknown>) => void

export interface CameraSpySet {
  stop: ReturnType<typeof vi.fn<CameraMethod>>
  easeTo: ReturnType<typeof vi.fn<CameraMethod>>
  flyTo: ReturnType<typeof vi.fn<CameraMethod>>
}

export interface MockMapRef {
  current: {
    stop: CameraSpySet['stop']
    easeTo: CameraSpySet['easeTo']
    flyTo: CameraSpySet['flyTo']
  }
}

export function createCameraSpySet(): CameraSpySet {
  return {
    stop: vi.fn(),
    easeTo: vi.fn(),
    flyTo: vi.fn(),
  }
}

export function createMockMapRef(spies: CameraSpySet = createCameraSpySet()): MockMapRef {
  return {
    current: {
      stop: spies.stop,
      easeTo: spies.easeTo,
      flyTo: spies.flyTo,
    },
  }
}
