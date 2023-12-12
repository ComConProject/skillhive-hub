import { NhostClient } from '@nhost/nhost-js'

export function useNhost() {
  const { public: config } = useRuntimeConfig()

  const nhost = new NhostClient({
    subdomain: config.nhostSubdomain,
    region: config.nhostRegion,
  })

  return {
    nhost,
  }
}
