import React from 'react';
import WelcomeSection from './WelcomeSection';
import StatsGrid from './StatsGrid';
import DailyMissions from './DailyMissions';
import FeaturedLessons from './FeaturedLessons';
import LeaderboardMini from './LeaderboardMiniFixed';
import FrontendRoadmap from './FrontendRoadmap';
import WeeklyGoal from './WeeklyGoal';

export default function Dashboard({ 
  user, 
  weeklyStats, 
  dailyMissions, 
  featuredLessons, 
  leaderboardData, 
  onViewLeaderboard 
}) {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Section */}
      <WelcomeSection user={user} weeklyStats={weeklyStats} />

      {/* Stats Grid */}
      <StatsGrid weeklyStats={weeklyStats} user={user} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Daily Missions & Featured Lessons */}
        <div className="lg:col-span-2 space-y-8">
          <DailyMissions missions={dailyMissions} />
          <FeaturedLessons lessons={featuredLessons} />
        </div>

        {/* Right Column - Leaderboard & Quest Progress */}
        <div className="space-y-8">
          <LeaderboardMini 
            leaderboardData={leaderboardData} 
            onViewAll={onViewLeaderboard} 
          />
          
          <WeeklyGoal weeklyStats={weeklyStats} />
        </div>
      </div>
    </div>
  );
}