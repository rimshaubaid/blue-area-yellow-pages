import React from "react";
import { useLocation } from "react-router-dom";
import CardElement from "../Card";

function Venues() {
  const location = useLocation();
  var ids = [];
  ids.push(location.state.resId);
  var names = [];
  names.push(location.state.resName);
  var types = [];
  types.push(location.state.resType);
  var locs = [];
  locs.push(location.state.resLoc);
  var images = [];
  images.push(location.state.resImg);
  var phones = [];
  phones.push(location.state.resPhone);
  var timing = [];
  timing.push(location.state.resTime);
  var lats = [];
  lats.push(location.state?.resLat);
  var lngs = [];
  lngs.push(location.state?.resLng);
  var dels = [];
  dels.push(location.state.resDel);
  var emails = [];
  emails.push(location.state?.resEmail);
  var addresses = [];
  addresses.push(location.state?.resAddress);
  return (
    <div>
      <h2>SEARCHED RESULT</h2>
      <div>
        <CardElement
          id={ids}
          lengthh={location.state.resTotal}
          names={names}
          category={types}
          location={locs}
          image={images}
          phone={phones}
          times={timing}
          latitude={lats}
          longitude={lngs}
          del={dels}
          address={addresses}
          email={emails}
        />
      </div>
    </div>
  );
}

export default Venues;
