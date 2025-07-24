import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Rating({ rating }) {
  let stars = [false, false, false, false, false];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars[i - 1] = true;
    }
  }
  return (
    <div className="flex flex-col items-start space-y-1 py-2">
      {/* Stars */}
      <div>
        {stars.map((s, index) => (
          <FontAwesomeIcon
            key={index}
            icon={["fas", "star"]}
            size="1x"
            className={s ? "text-yellow-300" : "text-gray-400"}
          />
        ))}
      </div>

      {/* Number */}
      <p className="text-sm font-medium text-gray-500">
        {rating} out of 5
      </p>
    </div>
  );
}

export default Rating;
