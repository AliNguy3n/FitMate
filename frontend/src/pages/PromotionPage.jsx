import MainLayout from "../layouts/MainLayout";
import PromotionData from "../data/promotion.json";

function PromotionPage() {
  const promotions = PromotionData || [];
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of day

  // Separate promotions by date status
  const currentPromotions = promotions.filter(promotion => {
    const startDate = new Date(promotion.startDate);
    const endDate = new Date(promotion.endDate);
    return today >= startDate && today <= endDate;
  });

  const upcomingPromotions = promotions.filter(promotion => {
    const startDate = new Date(promotion.startDate);
    return today < startDate;
  });

  const pastPromotions = promotions.filter(promotion => {
    const endDate = new Date(promotion.endDate);
    return today > endDate;
  });

  // Component to render promotion cards
  const PromotionCard = ({ promotion, status }) => (
    <div
      key={promotion.id}
      className={`relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-96 ${
        status === 'past' ? 'opacity-60' : ''
      }`}
    >
      {/* Full Screen Background Image */}
      <img
        src={promotion.image}
        alt={promotion.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Overlay Gradient - Sky Theme */}
      <div className="absolute inset-0 bg-gradient-to-t from-sky-900/80 via-sky-700/40 to-transparent"></div>

      {/* Status Badge */}
      <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold z-10 ${
        status === 'current' ? 'bg-green-500 text-white' :
        status === 'upcoming' ? 'bg-blue-500 text-white' :
        'bg-gray-500 text-white'
      }`}>
        {status === 'current' ? 'ACTIVE NOW' :
         status === 'upcoming' ? 'COMING SOON' :
         'EXPIRED'}
      </div>

      {/* Discount Badge - Sky Theme */}
      <div className="absolute top-4 right-4 bg-gradient-to-r from-sky-500 to-sky-600 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg z-10">
        {promotion.discount}% OFF
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
        <h2 className="text-2xl font-bold mb-2 text-white drop-shadow-lg">
          {promotion.name}
        </h2>

        <p className="text-sky-100 mb-4 line-clamp-2 drop-shadow">
          {promotion.introduction}
        </p>

        <div className="flex items-center justify-between">
          {/* Date Info Box - Sky Theme */}
          <div className="text-sm bg-sky-200/20 backdrop-blur-sm rounded-lg px-3 py-2 border border-sky-300/30">
            <span className="block text-xs text-sky-200">
              {status === 'current' ? 'Valid Until' :
               status === 'upcoming' ? 'Starts' :
               'Ended'}
            </span>
            <span className="font-semibold text-white">
              {status === 'current' ? new Date(promotion.endDate).toLocaleDateString() :
               status === 'upcoming' ? new Date(promotion.startDate).toLocaleDateString() :
               new Date(promotion.endDate).toLocaleDateString()}
            </span>
          </div>

          {/* CTA Button - Sky Theme */}
          <button
            className={`px-6 py-2 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg ${
              status === 'current' ? 'bg-gradient-to-r from-sky-400 to-sky-600 hover:from-sky-500 hover:to-sky-700 text-white hover:shadow-sky-500/25' :
              status === 'upcoming' ? 'bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white' :
              'bg-gray-400 text-gray-200 cursor-not-allowed'
            }`}
            disabled={status === 'past'}
          >
            {status === 'current' ? 'Claim Now' :
             status === 'upcoming' ? 'Notify Me' :
             'Expired'}
          </button>
        </div>
      </div>

      {/* Hover Effect Border - Sky Theme */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-sky-400/50 rounded-2xl transition-all duration-300 z-10"></div>
    </div>
  );

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-sky-800 mb-12">
          Special Promotions
        </h1>

        {/* Current Promotions */}
        {currentPromotions.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-green-600 mb-6 flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
              Active Promotions ({currentPromotions.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPromotions.map((promotion) => (
                <PromotionCard key={promotion.id} promotion={promotion} status="current" />
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Promotions */}
        {upcomingPromotions.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-blue-600 mb-6 flex items-center">
              <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
              Upcoming Promotions ({upcomingPromotions.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingPromotions.map((promotion) => (
                <PromotionCard key={promotion.id} promotion={promotion} status="upcoming" />
              ))}
            </div>
          </div>
        )}

        {/* Past Promotions */}
        {pastPromotions.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-600 mb-6 flex items-center">
              <span className="w-3 h-3 bg-gray-500 rounded-full mr-3"></span>
              Past Promotions ({pastPromotions.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastPromotions.map((promotion) => (
                <PromotionCard key={promotion.id} promotion={promotion} status="past" />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {promotions.length === 0 && (
          <div className="text-center py-16">
            <div className="text-sky-400 text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-semibold text-sky-700 mb-2">
              No Promotions Available
            </h3>
            <p className="text-sky-600">Check back later for amazing deals!</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default PromotionPage;