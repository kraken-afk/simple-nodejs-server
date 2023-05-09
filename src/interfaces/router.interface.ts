export default interface RouterInterface {
  /**
   *
   * @param url url to desired page
   * @return {string | buffer} - returning string or buffer of the desired file
   */
  get(url: string): string | Buffer;
}