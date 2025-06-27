export async function getCurrentUserCanEdit() {
  const resp = await fetch('/auth/status.json')
  const info = await resp.json()
  return info.authorized && info.teamMember
}
