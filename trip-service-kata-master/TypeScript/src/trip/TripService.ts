import UserNotLoggedInException from "../exception/UserNotLoggedInException";
import User from "../user/User";
import UserSession from "../user/UserSession";
import Trip from "./Trip";
import TripDAO from "./TripDAO";

export default class TripService {
    public getTripsByUser(user: User): Trip[] {
        const querier: User = UserSession.getLoggedUser();

        this.validateQuerierLoggedIn(querier);

        return this.areUserAndQuerierFriends(user, querier)
            ? TripDAO.findTripsByUser(user) :
            [];
    }

    private validateQuerierLoggedIn(loggedUser: User): void {
        if (loggedUser == null) {
            throw new UserNotLoggedInException();
        }
    }

    private areUserAndQuerierFriends(user: User, querier: User) {
        return user.getFriends().includes(querier);
    }
}
